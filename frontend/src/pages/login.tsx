import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Box,
  Flex,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  Image,
  InputGroup,
  InputRightElement,
  IconButton,
  FormErrorMessage,
  useToast,
  Alert,
  AlertIcon,
} from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import logo from "../assets/zsm-logo.png";
import rocketImage from "../assets/rocket.png";
import { API_BASE_URL } from "../config";

const Login: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const toast = useToast();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [errors, setErrors] = useState({
    username: "",
    password: "",
  });

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const validateForm = () => {
    const newErrors = {
      username: "",
      password: "",
    };
    let isValid = true;

    if (!username.trim()) {
      newErrors.username = "Username is required";
      isValid = false;
    }

    if (!password) {
      newErrors.password = "Password is required";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsLoading(true);
    setError("");

    try {
      // Call the backend authentication API with the URL from config
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          password,
        }),
      });
      
      if (!response.ok) {
        let errorMessage = "Invalid username or password";
        try {
          const errorData = await response.json();
          if (errorData.message) {
            errorMessage = errorData.message;
          }
        } catch (e) {
          // If response is not JSON, use default error message
        }
        throw new Error(errorMessage);
      }
      
      const data = await response.json();
      
      // Store tokens and user info in localStorage
      localStorage.setItem("accessToken", data.accessToken);
      localStorage.setItem("refreshToken", data.refreshToken);
      localStorage.setItem("user", JSON.stringify(data.user));
      
      toast({
        title: "Login successful",
        description: `Welcome back, ${data.user.name}!`,
        status: "success",
        duration: 3000,
        isClosable: true,
      });

      // Redirect based on user role
      switch (data.user.role) {
        case "admin":
          navigate("/admin/dashboard");
          break;
        case "instructor":
          navigate("/instructor/dashboard");
          break;
        case "student":
          navigate("/student/dashboard");
          break;
        default:
          navigate("/home");
      }
    } catch (err) {
      console.error(err);
      setError(err instanceof Error ? err.message : "An unexpected error occurred");
      toast({
        title: "Login failed",
        description: err instanceof Error ? err.message : "An unexpected error occurred",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Flex
      minHeight="100vh"
      width="full"
      align="center"
      justifyContent="center"
      bg="white"
    >
      <Flex width="100%" maxW="1200px">
        {/* Left side - Login Form */}
        <Box width={{ base: "100%", md: "50%" }} p={8}>
          <Box mb={9} mt={4}>
            <Image src={logo} alt="ZSM Logo" mx="auto" mb={4} maxW="150px" />
            <Heading
              as="h2"
              size="md"
              fontWeight="semibold"
              mb={1}
              textAlign="center"
              marginBottom={2}
            >
              Campus Connect: Learn Achieve Excel
            </Heading>
            <Text fontSize="sm" color="gray.500" textAlign="center">
              Welcome back, please login to your account!
            </Text>
          </Box>

          {error && (
            <Alert status="error" mb={4} borderRadius="md">
              <AlertIcon />
              {error}
            </Alert>
          )}

          <Box as="form" onSubmit={handleLogin} mt={8}>
            <FormControl id="username" mb={5} isInvalid={!!errors.username}>
              <FormLabel fontSize="sm" mb={1}>
                Username{" "}
                <Box as="span" color="red.500" display="inline">
                  *
                </Box>
              </FormLabel>
              <Input
                type="text"
                value={username}
                onChange={(e) => {
                  setUsername(e.target.value);
                  if (errors.username) setErrors({...errors, username: ""});
                }}
                placeholder="Input Username"
                size="md"
                borderRadius="md"
                height="40px"
                isRequired
              />
              <FormErrorMessage>{errors.username}</FormErrorMessage>
            </FormControl>

            <FormControl id="password" mb={8} isInvalid={!!errors.password}>
              <FormLabel fontSize="sm" mb={1}>
                Password{" "}
                <Box as="span" color="red.500" display="inline">
                  *
                </Box>
              </FormLabel>
              <InputGroup>
                <Input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (errors.password) setErrors({...errors, password: ""});
                  }}
                  placeholder="Input Password"
                  size="md"
                  borderRadius="md"
                  height="40px"
                  isRequired
                />
                <InputRightElement height="100%">
                  <IconButton
                    aria-label={showPassword ? "Hide password" : "Show password"}
                    size="sm"
                    icon={showPassword ? <ViewOffIcon /> : <ViewIcon />}
                    variant="ghost"
                    onClick={togglePasswordVisibility}
                  />
                </InputRightElement>
              </InputGroup>
              <FormErrorMessage>{errors.password}</FormErrorMessage>
            </FormControl>

            <Button
              width="full"
              bg="#0056A4"
              color="white"
              type="submit"
              isLoading={isLoading}
              loadingText="Logging in..."
              borderRadius="md"
              _hover={{ bg: "#004A8C" }}
              height="40px"
            >
              Login
            </Button>

            <Text mt={4} fontSize="sm" color="gray.500" textAlign="center">
              * Username and password are provided by your university
            </Text>
          </Box>
        </Box>

        {/* Right side - Content and Rocket Image - Hide on mobile */}
        <Box 
          width="50%" 
          position="relative" 
          display={{ base: "none", md: "block" }}
        >
          <Box
            position="absolute"
            top="70px"
            right="0"
            left="0"
            textAlign="center"
          >
            <Heading as="h2" size="md" fontWeight="semibold" marginBottom={3}>
              Campus Connect: Learn Achieve Excel
            </Heading>
            <Text fontSize="sm" color="gray.500">
              Fly High and Reach Your Dreams
            </Text>
          </Box>
          <Flex
            height="100%"
            width="100%"
            justifyContent="center"
            alignItems="center"
          >
            <Image src={rocketImage} alt="Rocket" height="400px" mt="120px" />
          </Flex>
        </Box>
      </Flex>
    </Flex>
  );
};

export default Login;