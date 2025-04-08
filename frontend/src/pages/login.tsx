import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
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
} from "@chakra-ui/react";
import { ViewIcon } from "@chakra-ui/icons";
import logo from "../assets/zsm-logo.png";
import rocketImage from "../assets/rocket.png";

const Login: React.FC = () => {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Here you would typically call your authentication API
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Store token in localStorage
      localStorage.setItem("token", "demo-token");

      // Redirect to home selection page
      navigate("/home");
    } catch (err) {
      console.error(err);
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
        <Box width="50%" p={8}>
          <Box mb={9} mt={4}>
            <Image src={logo} alt="ZSM Logo" mx="auto" mb={4} />
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

          <Box as="form" onSubmit={handleLogin} mt={8}>
            <FormControl id="username" mb={5}>
              <FormLabel fontSize="sm" mb={1}>
                Username{" "}
                <Box as="span" color="red.500" display="inline">
                  *
                </Box>
              </FormLabel>
              <Input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Input Username"
                size="md"
                borderRadius="md"
                height="40px"
              />
            </FormControl>

            <FormControl id="password" mb={8}>
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
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Input Password"
                  size="md"
                  borderRadius="md"
                  height="40px"
                />
                <InputRightElement height="100%">
                  <IconButton
                    aria-label="Show password"
                    size="sm"
                    icon={<ViewIcon />}
                    variant="ghost"
                    onClick={togglePasswordVisibility}
                  />
                </InputRightElement>
              </InputGroup>
            </FormControl>

            <Button
              width="full"
              bg="#0056A4"
              color="white"
              type="submit"
              isLoading={isLoading}
              borderRadius="md"
              _hover={{ bg: "#004A8C" }}
              height="40px"
            >
              Login
            </Button>
          </Box>
        </Box>

        {/* Right side - Content and Rocket Image */}
        <Box width="50%" position="relative">
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
