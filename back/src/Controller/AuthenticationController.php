<?php namespace App;

    class AuthenticationController {

        public function __construct(
            private ?string $email = null,
            private ?string $password = null,
            private ?string $username = null,
        ) {
            
        }

        public function getEmail(): string {
            return $this->email;
        }
        public function setEmail(string $email): void {
            $this->email = $email;
        }
        public function getPassword(): string {
            return $this->password;
        }
        public function setPassword(string $password): void {
            $this->password = $password;
        }
        public function getUsername(): string {
            return $this->username;
        }
        public function setUsername(string $username): void {
            $this->username = $username;
        }

        /**
         * Register a new user
         * @return void
         */
        public function register(): void {

            $data = json_decode(file_get_contents('php://input'), true);
            $response = array(
                'status' => 0,
                'message' => 'Error',
                'data' => null
            );

            if ($_SERVER["REQUEST_METHOD"] == "POST") {

                $name = $data['username'];
                $email = $data['email'];
                $password = $data['password'];
        
                $newUser = new User();
                $user = $newUser->findOneByEmail($email);
                if(!$user) {
                    $newUser->setEmail($email);
                    $newUser->setPassword($password);
                    $newUser->setUsername($name);
                    if($newUser->save()) {
                        $response['message'] = 'Utilisateur enregistré avec succès';
                    
                    }
                }
                else {
                    $response['message'] = 'Un utilisateur avec cet email existe déjà';
                }
            }
            
            echo json_encode($response);
        }

        /**
         * Login a user
         * @return bool
         */
        public function login(): void {

            $response = array(
                'status' => 0,
                'message' => 'Error',
                'data' => null
            );

            $data = json_decode(file_get_contents('php://input'), true);

            if($_SERVER['REQUEST_METHOD'] === 'POST') {

                $email = $data['email'];
                $password = $data['password'];

                $user = new User();
                $user = $user->findOneByEmail($email);
                if(!$user) {
                    $response['message'] = 'Les identifiants fournis ne correspondent à aucun utilisateur';
                }
                elseif($password === $user->getPassword()) {
                    $response['status'] = 200;
                    $response['message'] = 'Connexion réussie';
                    $response['data'] = array(
                        'id' => $user->getId(),
                        'username' => $user->getUsername(),
                        'email' => $user->getEmail(),
                    );
                    $_SESSION['user'] = $user;
                }
            }
            
            echo json_encode($response);
        }

        /**
         * Update the profile of the user
         * @return bool
         */
        public function updateProfile(): bool {

            $user = new User();
            $user = $user->findOneByEmail($this->email);
            if(!$user) {
                return false;
            }
            $user->setEmail($this->email);
            $user->setPassword($this->password);
            $user->setUsername($this->username);

            $user->save();
            $_SESSION['user'] = $user;
            
            return true;
        }
    }
