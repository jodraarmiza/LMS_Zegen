// import React, { useState } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import {
//   Box,
//   Flex,
//   Heading,
//   FormControl,
//   FormLabel,
//   Input,
//   Button,
//   Text,
//   Image,
//   InputGroup,
//   InputRightElement,
//   IconButton,
//   FormErrorMessage,
//   useToast,
//   Alert,
//   AlertIcon,
// } from "@chakra-ui/react";
// import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
// import logo from "../assets/zsm-logo.png";
// import rocketImage from "../assets/rocket.png";
// import api from "../services/api"; // ⬅️ Pakai API class kamu!

// const Login: React.FC = () => {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const toast = useToast();

//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const [isLoading, setIsLoading] = useState(false);
//   const [showPassword, setShowPassword] = useState(false);
//   const [error, setError] = useState("");
//   const [errors, setErrors] = useState({
//     username: "",
//     password: "",
//   });

//   const togglePasswordVisibility = () => {
//     setShowPassword(!showPassword);
//   };

//   const validateForm = () => {
//     const newErrors = { username: "", password: "" };
//     let isValid = true;

//     if (!username.trim()) {
//       newErrors.username = "Username is required";
//       isValid = false;
//     }
//     if (!password) {
//       newErrors.password = "Password is required";
//       isValid = false;
//     }

//     setErrors(newErrors);
//     return isValid;
//   };

//   const handleLogin = async (e: React.FormEvent) => {
//     e.preventDefault();

//     if (!validateForm()) {
//       return;
//     }

//     setIsLoading(true);
//     setError("");

//     try {
//       // ⬇️ Pakai api.post dari service
//       const data = await api.post("/auth/login", { username, password }, false); // false = no token

//       // Simpan token & user info ke localStorage
//       localStorage.setItem("accessToken", data.accessToken);
//       localStorage.setItem("refreshToken", data.refreshToken);
//       localStorage.setItem("user", JSON.stringify(data.user));

//       toast({
//         title: "Login successful",
//         description: `Welcome back, ${data.user.name}!`,
//         status: "success",
//         duration: 3000,
//         isClosable: true,
//       });

//       // Redirect berdasarkan role
//       switch (data.user.role) {
//         case "admin":
//           navigate("/admin/dashboard");
//           break;
//         case "instructor":
//           navigate("/instructor/dashboard");
//           break;
//         case "student":
//           navigate("/student/dashboard");
//           break;
//         default:
//           navigate("/home");
//       }
//     } catch (err) {
//       console.error(err);
//       setError(err instanceof Error ? err.message : "An unexpected error occurred");
//       toast({
//         title: "Login failed",
//         description: err instanceof Error ? err.message : "An unexpected error occurred",
//         status: "error",
//         duration: 3000,
//         isClosable: true,
//       });
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <Flex minHeight="100vh" width="full" align="center" justifyContent="center" bg="white">
//       <Flex width="100%" maxW="1200px">
//         {/* Left side - Login Form */}
//         <Box width={{ base: "100%", md: "50%" }} p={8}>
//           <Box mb={9} mt={4}>
//             <Image src={logo} alt="ZSM Logo" mx="auto" mb={4} maxW="150px" />
//             <Heading as="h2" size="md" fontWeight="semibold" mb={1} textAlign="center">
//               Campus Connect: Learn Achieve Excel
//             </Heading>
//             <Text fontSize="sm" color="gray.500" textAlign="center">
//               Welcome back, please login to your account!
//             </Text>
//           </Box>

//           {error && (
//             <Alert status="error" mb={4} borderRadius="md">
//               <AlertIcon />
//               {error}
//             </Alert>
//           )}

//           <Box as="form" onSubmit={handleLogin} mt={8}>
//             <FormControl id="username" mb={5} isInvalid={!!errors.username}>
//               <FormLabel fontSize="sm" mb={1}>
//                 Username <Box as="span" color="red.500" display="inline">*</Box>
//               </FormLabel>
//               <Input
//                 type="text"
//                 value={username}
//                 onChange={(e) => {
//                   setUsername(e.target.value);
//                   if (errors.username) setErrors({ ...errors, username: "" });
//                 }}
//                 placeholder="Input Username"
//                 size="md"
//                 borderRadius="md"
//                 height="40px"
//                 isRequired
//               />
//               <FormErrorMessage>{errors.username}</FormErrorMessage>
//             </FormControl>

//             <FormControl id="password" mb={8} isInvalid={!!errors.password}>
//               <FormLabel fontSize="sm" mb={1}>
//                 Password <Box as="span" color="red.500" display="inline">*</Box>
//               </FormLabel>
//               <InputGroup>
//                 <Input
//                   type={showPassword ? "text" : "password"}
//                   value={password}
//                   onChange={(e) => {
//                     setPassword(e.target.value);
//                     if (errors.password) setErrors({ ...errors, password: "" });
//                   }}
//                   placeholder="Input Password"
//                   size="md"
//                   borderRadius="md"
//                   height="40px"
//                   isRequired
//                 />
//                 <InputRightElement height="100%">
//                   <IconButton
//                     aria-label={showPassword ? "Hide password" : "Show password"}
//                     size="sm"
//                     icon={showPassword ? <ViewOffIcon /> : <ViewIcon />}
//                     variant="ghost"
//                     onClick={togglePasswordVisibility}
//                   />
//                 </InputRightElement>
//               </InputGroup>
//               <FormErrorMessage>{errors.password}</FormErrorMessage>
//             </FormControl>

//             <Button
//               width="full"
//               bg="#0056A4"
//               color="white"
//               type="submit"
//               isLoading={isLoading}
//               loadingText="Logging in..."
//               borderRadius="md"
//               _hover={{ bg: "#004A8C" }}
//               height="40px"
//             >
//               Login
//             </Button>

//             <Text mt={4} fontSize="sm" color="gray.500" textAlign="center">
//               * Username and password are provided by your university
//             </Text>
//           </Box>
//         </Box>

//         {/* Right side - Rocket Image */}
//         <Box width="50%" position="relative" display={{ base: "none", md: "block" }}>
//           <Box position="absolute" top="70px" right="0" left="0" textAlign="center">
//             <Heading as="h2" size="md" fontWeight="semibold" mb={3}>
//               Campus Connect: Learn Achieve Excel
//             </Heading>
//             <Text fontSize="sm" color="gray.500">
//               Fly High and Reach Your Dreams
//             </Text>
//           </Box>
//           <Flex height="100%" width="100%" justifyContent="center" alignItems="center">
//             <Image src={rocketImage} alt="Rocket" height="400px" mt="120px" />
//           </Flex>
//         </Box>
//       </Flex>
//     </Flex>
//   );
// };

// export default Login;
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
  Code
} from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import logo from "../assets/zsm-logo.png";
import rocketImage from "../assets/rocket.png";
import api from "../services/api"; // Updated API service
import { API_URLS, DEBUG_MODE } from "../config"; // Import config

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

  // Check API connection on component mount
  useEffect(() => {
    // Variabel untuk mengontrol apakah komponen masih terpasang (mounted)
    let isMounted = true;
    
    // Tidak perlu melakukan pengecekan koneksi jika sudah ada token
    const token = localStorage.getItem("accessToken");
    if (token) {
      // Jika sudah login, set status connected
      setConnectionStatus("connected");
      return;
    }
    
    const checkConnection = async () => {
      // First try the proxy approach
      try {
        console.log("Checking server connection using proxy...");
        // Simple GET request to health endpoint atau root API
        await fetch(`/api/v1/health`, { 
          method: 'GET',
          signal: AbortSignal.timeout(3000) // 3 second timeout
        });
        
        // Pastikan komponen masih terpasang sebelum update state
        if (!isMounted) return;
        
        console.log("✅ Server connection successful via proxy");
        setConnectionStatus("connected");
        setWorkingUrl('/api/v1/');
        return;
      } catch (err) {
        // Pastikan komponen masih terpasang
        if (!isMounted) return;
        
        console.error("❌ API connection via proxy failed:", err);
      }
  
      // Then try direct URLs
      for (const [name, baseUrl] of Object.entries(API_URLS)) {
        // Skip the proxy attempt and non-HTTP URLs
        if (!baseUrl.startsWith('http')) continue;
        
        try {
          console.log(`Checking server connection at: ${baseUrl}`);
          
          // Try a health endpoint atau root API
          const healthUrl = `${baseUrl}health`;
          await fetch(healthUrl, { 
            method: 'GET',
            mode: 'cors',
            credentials: 'omit',
            signal: AbortSignal.timeout(3000) // 3 second timeout
          });
          
          // Pastikan komponen masih terpasang
          if (!isMounted) return;
          
          console.log(`✅ Server connection successful at ${name}: ${baseUrl}`);
          setConnectionStatus("connected");
          setWorkingUrl(baseUrl);
          // If we found a working URL, stop checking
          return;
        } catch (err) {
          // Pastikan komponen masih terpasang
          if (!isMounted) return;
          
          console.error(`❌ API connection to ${name}: ${baseUrl} failed:`, err);
          // Continue to the next URL
        }
      }
      
      // If we get here, all URLs failed for health check
      // Try a HEAD request just to see if the server is reachable at all
      for (const [name, baseUrl] of Object.entries(API_URLS)) {
        if (!baseUrl.startsWith('http')) continue;
        
        try {
          await fetch(baseUrl, { 
            method: 'HEAD',
            mode: 'cors',
            credentials: 'omit',
            signal: AbortSignal.timeout(2000)
          });
          
          // Pastikan komponen masih terpasang
          if (!isMounted) return;
          
          console.log(`✅ Server partially reachable at ${name}: ${baseUrl}`);
          setConnectionStatus("partial");
          setWorkingUrl(baseUrl);
          return;
        } catch (err) {
          // Pastikan komponen masih terpasang
          if (!isMounted) return;
          
          console.error(`❌ Server not reachable at ${name}: ${baseUrl}`);
        }
      }
      
      // If we get here, all URLs completely failed
      // Pastikan komponen masih terpasang
      if (!isMounted) return;
      
      console.error("❌ All API connections failed");
      setConnectionStatus("disconnected");
    };
  
    // Jalankan pengecekan koneksi
    checkConnection();
  
    // Cleanup function untuk mencegah update state setelah komponen unmount
    return () => {
      isMounted = false;
    };
  }, []); 

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
      if (DEBUG_MODE) {
        console.log("Attempting login with:", { username, password: "***REDACTED***" });
      }
      
      // Login process
      const data = await api.post("/auth/login", { username, password }, false);
  
      if (DEBUG_MODE) {
        console.log("Login successful, received data:", { 
          ...data, 
          user: data.user,
          accessToken: "***REDACTED***", 
          refreshToken: "***REDACTED***" 
        });
      }
  
      // Save token & user info to localStorage
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
  
      // PERUBAHAN: Arahkan selalu ke halaman HomeSelection terlebih dahulu
      navigate("/home");
      
      /* 
      // Kode navigasi lama berdasarkan role, kita hapus/comment
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
      */
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
                    {Object.entries(API_URLS).map(([name, url]) => (
                      <Box as="li" key={name}>
                        <strong>{name}:</strong> {url}
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
                </AlertDescription>
              </Box>
              <CloseButton position="absolute" right="8px" top="8px" />
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
              isDisabled={connectionStatus === "disconnected" || connectionStatus === "checking"}
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