<?php
    
    header("Access-Control-Allow-Origin: *");
    require_once 'vendor/autoload.php';
    session_start();

    $router = new AltoRouter();
    $router->setBasePath('/pomme-d-api/back');

    // authentication routes
    $router->map( 'GET|POST', '/login', 'App\AuthenticationController#login', 'login');
    $router->map( 'GET|POST', '/register', 'App\AuthenticationController#register', 'register');

    // match current request url
    $match = $router->match();

    // call closure or throw 404 status
    if (is_array($match)) {
        // call closure
        if (is_callable($match['target'])) {
            call_user_func_array($match['target'], $match['params']);
        }
        // call method on class
        elseif (is_string($match['target'])) {
            list($class, $method) = explode("#", $match['target']);
            if (class_exists($class) && method_exists($class, $method)) {
                call_user_func_array(array(new $class, $method), $match['params']);
            } else {
                header($_SERVER["SERVER_PROTOCOL"] . ' 404 Not Found');
            }
        }
    } else {
        // no route was matched
        header($_SERVER["SERVER_PROTOCOL"] . ' 404 Not Found');
    }
