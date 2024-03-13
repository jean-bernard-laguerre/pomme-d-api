<?php namespace App;
    use PDO;
    class Database{

        public $bdd;
        private $host = "localhost";
        private $dbname = "pomme-d-api";
        private $username = "root";
        private $password = "";

        public function __construct()
        {
            $this->bdd = new PDO("mysql:host=" . $this->host . 
                                ";dbname=" . $this->dbname .
                                ";charset=utf8", $this->username , $this->password);
        }
    }
