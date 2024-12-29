<motion.div
  initial={{ opacity: 0, y: 50 }}
  animate={{ opacity: 1, y: 0 }}
  exit={{ opacity: 0, y: -50 }}
  transition={{ duration: 0.5 }}
>
  <Heading
    mb="6"
    textAlign="center"
    fontSize={{ base: '2xl', md: '3xl' }}
  >
    Benefits of Using FactGuard
  </Heading>

  <HStack
    align="start"
    spacing={{ base: 8, md: 12 }}
    flexDirection={{ base: 'column', md: 'row' }}
    w="100%"
  >
    {/* Image Section */}
    <Image
      src={benefitsImage}
      alt="FactGuard benefits illustration"
      w={{ base: '80%', md: '40%' }}
      mb={{ base: 4, md: 0 }}
      flexShrink={0}
    />

    {/* Text Section */}
    <VStack spacing={8} align="start" w="100%">
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
        <Box
          p="5"
          bg={boxBg}
          color={boxColor}
          shadow="md"
          borderRadius="md"
          _hover={{ bg: useColorModeValue('gray.50', 'gray.600') }}
        >
          <HStack spacing={4}>
            <Box fontSize="lg" color={primaryColor}>
              <FaCheckCircle />
            </Box>
            <VStack align="start" spacing={1}>
              <Heading size="md">Enhanced Content Trust</Heading>
              <Text fontSize={{ base: 'sm', md: 'md' }}>
                Build trust in your brand by ensuring the authenticity of your content. 
                With FactGuard's tools, you can confidently share verified information with your audience.
              </Text>
            </VStack>
          </HStack>
        </Box>
      </motion.div>

      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
        <Box
          p="5"
          bg={boxBg}
          color={boxColor}
          shadow="md"
          borderRadius="md"
          _hover={{ bg: useColorModeValue('gray.50', 'gray.600') }}
        >
          <HStack spacing={4}>
            <Box fontSize="lg" color={primaryColor}>
              <FaTasks />
            </Box>
            <VStack align="start" spacing={1}>
              <Heading size="md">Comprehensive Fact-Checking</Heading>
              <Text fontSize={{ base: 'sm', md: 'md' }}>
                Utilize advanced tools to verify claims and enhance credibility. 
                FactGuard provides accurate results to support your decisions and messaging.
              </Text>
            </VStack>
          </HStack>
        </Box>
      </motion.div>

      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
        <Box
          p="5"
          bg={boxBg}
          color={boxColor}
          shadow="md"
          borderRadius="md"
          _hover={{ bg: useColorModeValue('gray.50', 'gray.600') }}
        >
          <HStack spacing={4}>
            <Box fontSize="lg" color={primaryColor}>
              <FaBrain />
            </Box>
            <VStack align="start" spacing={1}>
              <Heading size="md">AI-Powered Efficiency</Heading>
              <Text fontSize={{ base: 'sm', md: 'md' }}>
                Save time and resources with automated fake news detection processes. 
                Let our intelligent systems streamline your fact-checking efforts.
              </Text>
            </VStack>
          </HStack>
        </Box>
      </motion.div>
    </VStack>
  </HStack>
</motion.div>
