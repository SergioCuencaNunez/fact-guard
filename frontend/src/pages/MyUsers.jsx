import React, { useState, useEffect } from "react";
import {
  HStack,
  Box,
  Flex,
  Heading,
  Text,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Button,
  IconButton,
  Checkbox,
  useDisclosure,
  useColorMode,
  useColorModeValue,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import { FaTrashAlt } from "react-icons/fa";
import {
  SunIcon,
  MoonIcon,
  WarningIcon,
} from "@chakra-ui/icons";
import { motion, AnimatePresence } from "framer-motion";

const primaryColor = "#4dcfaf";

const MyUsers = ({ users, deleteUser }) => {  
  const cardBg = useColorModeValue("white", "gray.700");
  
  const { colorMode, toggleColorMode } = useColorMode();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [userToDelete, setUserToDelete] = useState(null);
  const [selectedUsers, setSelectedUsers] = useState([]);

  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          const decoded = JSON.parse(atob(token.split('.')[1]));
          if (decoded?.role === "admin") setIsAdmin(true);
        } catch (e) {
          console.error("Failed to decode token", e);
        }
      }
    }, []);
  
  const handleDelete = (user) => {
    setUserToDelete(user);
    onOpen();
  };

  const confirmDelete = async () => {
    try {
      if (userToDelete) {
        // Delete a single claim check
        await deleteUser(userToDelete.id);
      } else {
        // Delete selected claim check
        for (const user of selectedUsers) {
          await deleteUser(user.id);
        }
        setSelectedUsers([]);
      }
      onClose();
    } catch (error) {
      console.error("Error deleting user(s):", error);
    }
  };

  const handleSelectAll = (isChecked) => {
    if (isChecked) {
      setSelectedUsers(users);
    } else {
      setSelectedUsers([]);
    }
  };

  const handleSelectUser = (user, isChecked) => {
    if (isChecked) {
      setSelectedUsers((prev) => [...prev, user]);
    } else {
      setSelectedUsers((prev) => prev.filter((item) => item.id !== user.id));
    }
  };

  const formatDate = (isoString) => {
    const date = new Date(isoString);
    const options = { day: "2-digit", month: "2-digit", year: "numeric", hour: "2-digit", minute: "2-digit" };
    return date.toLocaleDateString("en-GB", options).replace(",", "");
  };
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -50 }}
      transition={{ duration: 0.5 }}
    >
      <Box px={{ md: 4 }} py={{ md: 6 }}>
        <Flex direction="column" bg={cardBg} p={8} borderRadius="md" shadow="md">
          <Flex justify="space-between" align="center" mb="4">
            <Heading fontSize={{ base: '3xl', md: '4xl' }}>All Users</Heading>                     
            <HStack spacing="4" display={{ base: "none", lg: "flex" }}>
              <IconButton
                aria-label="Toggle theme"
                icon={colorMode === "light" ? <MoonIcon /> : <SunIcon />}
                onClick={toggleColorMode}
              />
            </HStack>
          </Flex>
          <Box borderBottom="1px" borderColor="gray.300" mb="4"></Box>
          {users.length > 0 ? (
            <>
              <Box overflowX="auto">
                <Table colorScheme={colorMode === "light" ? "gray" : "whiteAlpha"} mb="4">
                  <Thead>
                    <Tr>
                      <Th width="10%" textAlign="center"><b>ID</b></Th>
                      <Th width="20%" textAlign="center"><b>Username</b></Th>
                      <Th width="30%" textAlign="center"><b>Email</b></Th>
                      <Th width="20%" textAlign="center"><b>Last Access</b></Th>
                      <Th width="10%" textAlign="center"><b>Remove</b></Th>
                      <Th width="10%" textAlign="center"><b>Select</b></Th>
                    </Tr>
                  </Thead>
                  <Tbody as={motion.tbody}>
                    <AnimatePresence>
                      {users.map((user) => (
                        <motion.tr
                          key={user.id}
                          layout
                          initial={{ opacity: 0, y: 50 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -50 }}
                          transition={{ duration: 0.5 }}
                        >
                          <Td textAlign="center">{user.id}</Td>
                          <Td textAlign="center">{user.username}</Td>
                          <Td textAlign="center">{user.email}</Td> 
                          <Td textAlign="center">{formatDate(user.last_access)}</Td>
                          <Td textAlign="center">
                            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                              <Button size="sm" color={primaryColor} onClick={() => handleDelete(user)}>
                                <FaTrashAlt />
                              </Button>
                            </motion.div>
                          </Td>
                          <Td textAlign="center">
                            <Checkbox
                              isChecked={selectedUsers.some((item) => item.id === user.id)}
                              onChange={(e) => handleSelectUser(user, e.target.checked)}
                            />
                          </Td>
                        </motion.tr>
                      ))}
                    </AnimatePresence>
                  </Tbody>
                </Table>
              </Box>
              <Flex justify="space-between" align="center" mb="4" height="40px">
                <Checkbox
                  isChecked={selectedUsers.length === users.length}
                  onChange={(e) => handleSelectAll(e.target.checked)}
                >
                  Select All
                </Checkbox>
                <AnimatePresence>
                  {selectedUsers.length > 0 && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8, x: 0 }}
                      animate={{
                        opacity: 1,
                        scale: 1,
                      }}
                      exit={{ opacity: 0, scale: 0.8, x: 0 }}
                      transition={{ duration: 0.3 }}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <Button
                        colorScheme="red"
                        onClick={() => {
                          setUserToDelete(null);
                          onOpen();
                        }}
                        isDisabled={selectedUsers.length === 0}
                      >
                        Delete Selected
                      </Button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </Flex>
            </>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 15 }}
              transition={{ duration: 0.5 }}
            >
              <Flex align="center" justify="center" direction="column" h={{ base: "auto", md: "15vh" }} mb="4" mt="4">
                <WarningIcon boxSize="6" color="gray.500" mb="2" />
                <Text fontSize="lg" color="gray.500" textAlign="center">
                  No users have registered.
                </Text>
              </Flex>
            </motion.div>
          )}

          {/* Confirmation Modal */}
          <Modal isOpen={isOpen} onClose={onClose} isCentered>
            <ModalOverlay />
              <ModalContent
                width={{ base: "90%"}}
              >
              <ModalHeader>Confirm Deletion</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                Are you sure you want to delete user <b>{userToDelete?.username}</b> and all their data (claims and detections)?
              </ModalBody>
              <ModalFooter>
                <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                  <Button colorScheme="red" mr={3} onClick={confirmDelete}>
                    Delete
                  </Button>
                </motion.div>
                <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                  <Button onClick={onClose}>
                    Cancel
                  </Button>
                </motion.div>
              </ModalFooter>
            </ModalContent>
          </Modal>
        </Flex>
      </Box>
    </motion.div>
  );
};

export default MyUsers;
