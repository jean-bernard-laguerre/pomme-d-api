<?php
    namespace App;
    use PDO;

    class User {

        public function __construct(
            private ?int $id = null,
            private ?string $username = null,
            private ?string $email = null,
            private ?string $password = null,
        ) {

        }

        public function getId(): int {
            return $this->id;
        }
        public function setId(int $id): void {
            $this->id = $id;
        }
        public function getUsername(): string {
            return $this->username;
        }
        public function setUsername(string $username): void {
            $this->username = $username;
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

        /**
         * Find a user by id
         * @param int $id
         * @return User|bool
         */
        public function findOneById(int $id): User|bool {
            $db = new Database();
            $sql = "SELECT * FROM user WHERE id = :id";

            $stmt = $db->bdd->prepare($sql);
            $stmt->bindValue(':id', $id, PDO::PARAM_INT);
            $stmt->execute();
            $user = $stmt->fetch(PDO::FETCH_ASSOC);
            if($user) {
                return new User(
                    $user['id'],
                    $user['username'],
                    $user['email'],
                    $user['password'],
                );
            }
            return false;
        }

        /**
         * Find a user by email
         * @param string $email
         * @return User|bool
         */
        public function findOnebyEmail(string $email): User|bool {
            $db = new Database();
            $sql = "SELECT * FROM user WHERE email = :email";

            $stmt = $db->bdd->prepare($sql);
            $stmt->bindValue(':email', $email, PDO::PARAM_STR);
            $stmt->execute();
            $user = $stmt->fetch(PDO::FETCH_ASSOC);
            if($user) {
                return new User(
                    $user['id'],
                    $user['username'],
                    $user['email'],
                    $user['password'],
                );
            }
            return false;
        }

        /**
         * Find all users
         * @return array
         */
        public function findAll(): array {
            $db = new Database();
            $sql = "SELECT * FROM user";

            $stmt = $db->bdd->prepare($sql);
            $stmt->execute();
            $users = $stmt->fetchAll(PDO::FETCH_ASSOC);
            $usersList = [];
            foreach ($users as $user) {
                array_push($usersList, new User(
                    $user['id'],
                    $user['username'],
                    $user['email'],
                    $user['password'],
                ));
            }
            return $usersList;
        }

        /**
         * Create a user
         * @return User|bool
         */
        public function create(): User|bool {
            $db = new Database();
            $sql = "INSERT INTO user (username, email, password)
                    VALUES (:username, :email, :password)";

            $stmt = $db->bdd->prepare($sql);
            $stmt->bindValue(':username', $this->username, PDO::PARAM_STR);
            $stmt->bindValue(':email', $this->email, PDO::PARAM_STR);
            $stmt->bindValue(':password', $this->password, PDO::PARAM_STR);
            if($stmt->execute()) {
                $this->id = $db->bdd->lastInsertId();
                return $this;
            }
            return false;
        }

        /**
         * Update a user
         * @return User|bool
         */
        public function update() {
            $db = new Database();

            $sql = "UPDATE user SET username = :username, email = :email, password = :password WHERE id = :id";

            $stmt = $db->bdd->prepare($sql);
            $stmt->bindValue(':username', $this->username, PDO::PARAM_STR);
            $stmt->bindValue(':email', $this->email, PDO::PARAM_STR);
            $stmt->bindValue(':password', $this->password, PDO::PARAM_STR);
            $stmt->bindValue(':id', $this->id, PDO::PARAM_INT);
            if($stmt->execute()) {
                return $this;
            }
        }

        /**
         * Delete a user
         * @param int $id
         * @return bool
         */
        public function delete(int $id): bool {
            $db = new Database();
            $sql = "DELETE FROM user WHERE id = :id";

            $stmt = $db->bdd->prepare($sql);
            $stmt->bindValue(':id', $id, PDO::PARAM_INT);
            return $stmt->execute();
        }

        /**
         * Save a user
         * @return User|bool
         */
        public function save() {
            if($this->id) {
                return $this->update();
            }
            return $this->create();
        }
    };
