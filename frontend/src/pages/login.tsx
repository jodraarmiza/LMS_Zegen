import React, { useState, useEffect } from "react";
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
  AlertTitle,
  AlertDescription,
  CloseButton,
  Spinner,
  Code,
  Link
} from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import logo from "../assets/zsm-logo.png";
import rocketImage from "../assets/rocket.png";
import api from "../services/api";
import { API_URLS, DEBUG_MODE } from "../config";

// Define response type for login API
interface LoginResponse {
  accessToken: string;
  refreshToken: string;
  user: {
    id: string | number;
    name: string;
    username: string;
    email?: string;
    role: string;
    [key: string]: any; // For any additional user properties
  };
}

const Login: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const toast = useToast();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [connectionStatus, setConnectionStatus] = useState<"checking" | "connected" | "disconnected" | "partial">("checking");
  const [workingUrl, setWorkingUrl] = useState<string | null>(null);
  const [errors, setErrors] = useState({
    username: "",
    password: "",
  });
  const [errorURLs, setErrorURLs] = useState<string[]>([]);

  // Force a direct login attempt bypassing connection checks
  const [bypassConnectionCheck, setBypassConnectionCheck] = useState(false);

  // Check API connection on component mount
  useEffect(() => {
    // Skip connection check if bypass is enabled
    if (bypassConnectionCheck) {
      setConnectionStatus("connected");
      return;
    }
    
    // Variable to track if component is still mounted
    let isMounted = true;
    
    // Skip connection check if already logged in
    const token = localStorage.getItem("accessToken");
    if (token) {
      setConnectionStatus("connected");
      return;
    }
    
    const checkConnection = async () => {
      const failedURLs: string[] = [];
      
      // First try the proxy approach
      try {
        console.log("Checking server connection using proxy...");
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 3000);
        
        await fetch(`/api/v1/health`, { 
          method: 'GET',
          signal: controller.signal
        });
        
        clearTimeout(timeoutId);
        
        if (!isMounted) return;
        
        console.log("✅ Server connection successful via proxy");
        setConnectionStatus("connected");
        setWorkingUrl('/api/v1/');
        return;
      } catch (err) {
        if (!isMounted) return;
        
        console.error("❌ API connection via proxy failed:", err);
        failedURLs.push('/api/v1/');
      }
  
      // Try direct URLs including client IP
      const urlsToTry = {
        ...API_URLS,
        // Add client IP specifically if not already in API_URLS
        clientIP: "http://192.168.100.250:50404/api/v1/"
      };
      
      // Then try direct URLs
      for (const [name, baseUrl] of Object.entries(urlsToTry)) {
        // Skip non-HTTP URLs
        if (!baseUrl.startsWith('http')) continue;
        
        try {
          console.log(`Checking server connection at: ${baseUrl}`);
          
          // Try a health endpoint
          const healthUrl = `${baseUrl}health`;
          const controller = new AbortController();
          const timeoutId = setTimeout(() => controller.abort(), 3000);
          
          await fetch(healthUrl, { 
            method: 'GET',
            mode: 'cors',
            credentials: 'omit',
            signal: controller.signal
          });
          
          clearTimeout(timeoutId);
          
          if (!isMounted) return;
          
          console.log(`✅ Server connection successful at ${name}: ${baseUrl}`);
          setConnectionStatus("connected");
          setWorkingUrl(baseUrl);
          localStorage.setItem('workingApiURL', baseUrl);
          // If we found a working URL, stop checking
          return;
        } catch (err) {
          if (!isMounted) return;
          
          console.error(`❌ API connection to ${name}: ${baseUrl} failed:`, err);
          failedURLs.push(baseUrl);
          // Continue to the next URL
        }
      }
      
      // Try the endpoints themselves without the health check
      for (const [name, baseUrl] of Object.entries(urlsToTry)) {
        if (!baseUrl.startsWith('http')) continue;
        
        try {
          const controller = new AbortController();
          const timeoutId = setTimeout(() => controller.abort(), 2000);
          
          await fetch(baseUrl, { 
            method: 'HEAD',
            mode: 'cors',
            credentials: 'omit',
            signal: controller.signal
          });
          
          clearTimeout(timeoutId);
          
          if (!isMounted) return;
          
          console.log(`✅ Server partially reachable at ${name}: ${baseUrl}`);
          setConnectionStatus("partial");
          setWorkingUrl(baseUrl);
          localStorage.setItem('workingApiURL', baseUrl);
          return;
        } catch (err) {
          if (!isMounted) return;
          
          console.error(`❌ Server not reachable at ${name}: ${baseUrl}`);
          // Already added to failedURLs above
        }
      }
      
      // If we get here, all URLs completely failed
      if (!isMounted) return;
      
      console.error("❌ All API connections failed");
      setConnectionStatus("disconnected");
      setErrorURLs(failedURLs);
    };
  
    // Run the connection check
    checkConnection();
  
    // Cleanup function to prevent state updates after unmount
    return () => {
      isMounted = false;
    };
  }, [bypassConnectionCheck]); 

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const validateForm = () => {
    const newErrors = { username: "", password: "" };
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
      // Special case for admin/admin123 - direct login without API call
      if (username === "admin" && password === "admin123") {
        console.log("Using direct admin login");
        
        // Simulate successful login response
        const mockData: LoginResponse = {
          accessToken: "mock-token-for-admin",
          refreshToken: "mock-refresh-token-for-admin",
          user: {
            id: 1,
            name: "System Admin",
            username: "admin",
            email: "admin@lms.com",
            role: "admin"
          }
        };
        
        // Save tokens & user info to localStorage
        localStorage.setItem("accessToken", mockData.accessToken);
        localStorage.setItem("refreshToken", mockData.refreshToken);
        localStorage.setItem("user", JSON.stringify(mockData.user));
        
        toast({
          title: "Login successful",
          description: `Welcome back, ${mockData.user.name}!`,
          status: "success",
          duration: 3000,
          isClosable: true,
        });
        
        // Navigate directly to AdminOffice dashboard
        navigate("/E-Campus/Adminoffice");
        return;
      }
      
      // Normal API login for other credentials
      if (DEBUG_MODE) {
        console.log("Attempting login with:", { username, password: "***REDACTED***" });
      }
      
      // Login process with proper type assertion
      const data = await api.post<LoginResponse>("/auth/login", { username, password }, false);
  
      if (DEBUG_MODE) {
        console.log("Login successful, received data:", { 
          ...data, 
          user: data.user,
          accessToken: "***REDACTED***", 
          refreshToken: "***REDACTED***" 
        });
      }
  
      // Save tokens & user info
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

      // Redirect based on role
      const roleRoutes: Record<string, string> = {
        admin: "/E-Campus/Adminoffice",       // maps to src/pages/E-Campus/Adminoffice/index.tsx
        instructor: "/E-Campus/Adminkaprodi", // maps to src/pages/E-Campus/Adminkaprodi/index.tsx
        student: "/home",                     // redirects to HomeSelection for students
      };
      
      navigate(roleRoutes[data.user.role] || "/home");
    } catch (err) {
      console.error("Login error:", err);
      
      // Handle different types of errors with more specific messages
      if (err instanceof Error) {
        if (err.message.includes("Network error")) {
          setError("Unable to connect to the server. Please check your internet connection and verify the server is running.");
        } else if (err.message.includes("404")) {
          setError("Login endpoint not found. The API endpoint may have changed or is not available.");
        } else if (err.message.includes("401") || err.message.includes("403")) {
          setError("Invalid username or password. Please try again.");
        } else {
          setError(err.message);
        }
      } else {
        setError("An unexpected error occurred during login.");
      }
      
      toast({
        title: "Login failed",
        description: err instanceof Error ? err.message : "An unexpected error occurred",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Function to bypass connection checks and attempt login anyway
  const handleBypassConnectionCheck = () => {
    setBypassConnectionCheck(true);
  };

  return (
    <Flex minHeight="100vh" width="full" align="center" justifyContent="center" bg="white">
      <Flex width="100%" maxW="1200px">
        {/* Left side - Login Form */}
        <Box width={{ base: "100%", md: "50%" }} p={8}>
          <Box mb={9} mt={4}>
            <Image src={logo} alt="ZSM Logo" mx="auto" mb={4} maxW="150px" />
            <Heading as="h2" size="md" fontWeight="semibold" mb={1} textAlign="center">
              Campus Connect: Learn Achieve Excel
            </Heading>
            <Text fontSize="sm" color="gray.500" textAlign="center">
              Welcome back, please login to your account!
            </Text>
          </Box>

          {connectionStatus === "checking" && (
            <Alert status="info" mb={4} borderRadius="md">
              <AlertIcon />
              <Flex align="center">
                <Spinner size="sm" mr={2} />
                <Text>Checking server connection...</Text>
              </Flex>
            </Alert>
          )}

          {connectionStatus === "partial" && (
            <Alert status="warning" mb={4} borderRadius="md">
              <AlertIcon />
              <Box flex="1">
                <AlertTitle>Limited Server Connection</AlertTitle>
                <AlertDescription display="block">
                  The server at <Code>{workingUrl}</Code> is reachable but the health endpoint is not responding.
                  You can try logging in, but some features may not work correctly.
                </AlertDescription>
              </Box>
            </Alert>
          )}

          {connectionStatus === "disconnected" && (
            <Alert status="error" mb={4} borderRadius="md">
              <AlertIcon />
              <Box flex="1">
                <AlertTitle>Server Connection Error</AlertTitle>
                <AlertDescription display="block">
                  Unable to connect to the server. Tried these URLs:
                  <Box as="ul" pl={4} mt={2}>
                    {errorURLs.map((url, index) => (
                      <Box as="li" key={index}>
                        <Code>{url}</Code>
                      </Box>
                    ))}
                  </Box>
                  <Box mt={2}>Please check:</Box>
                  <Box as="ul" pl={4} mt={1}>
                    <Box as="li">Your backend server is running</Box>
                    <Box as="li">Your network/internet connection</Box>
                    <Box as="li">CORS is properly configured on the server</Box>
                    <Box as="li">Firewalls or security settings</Box>
                  </Box>
                  <Box mt={2}>
                    <Link 
                      color="blue.500" 
                      onClick={handleBypassConnectionCheck}
                      textDecoration="underline"
                      cursor="pointer"
                    >
                      Try logging in anyway
                    </Link>
                  </Box>
                </AlertDescription>
              </Box>
              <CloseButton 
                position="absolute" 
                right="8px" 
                top="8px" 
                onClick={handleBypassConnectionCheck}
              />
            </Alert>
          )}

          {error && (
            <Alert status="error" mb={4} borderRadius="md">
              <AlertIcon />
              {error}
            </Alert>
          )}

          <Box as="form" onSubmit={handleLogin} mt={8}>
            <FormControl id="username" mb={5} isInvalid={!!errors.username}>
              <FormLabel fontSize="sm" mb={1}>
                Username <Box as="span" color="red.500" display="inline">*</Box>
              </FormLabel>
              <Input
                type="text"
                value={username}
                onChange={(e) => {
                  setUsername(e.target.value);
                  if (errors.username) setErrors({ ...errors, username: "" });
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
                Password <Box as="span" color="red.500" display="inline">*</Box>
              </FormLabel>
              <InputGroup>
                <Input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (errors.password) setErrors({ ...errors, password: "" });
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
              isDisabled={connectionStatus === "checking"}
            >
              Login
            </Button>

            <Text mt={4} fontSize="sm" color="gray.500" textAlign="center">
              * Username and password are provided by your university
            </Text>
          </Box>
        </Box>

        {/* Right side - Rocket Image */}
        <Box width="50%" position="relative" display={{ base: "none", md: "block" }}>
          <Box position="absolute" top="70px" right="0" left="0" textAlign="center">
            <Heading as="h2" size="md" fontWeight="semibold" mb={3}>
              Campus Connect: Learn Achieve Excel
            </Heading>
            <Text fontSize="sm" color="gray.500">
              Fly High and Reach Your Dreams
            </Text>
          </Box>
          <Flex height="100%" width="100%" justifyContent="center" alignItems="center">
            <Image src={rocketImage} alt="Rocket" height="400px" mt="120px" />
          </Flex>
        </Box>
      </Flex>
    </Flex>
  );
};

export default Login;