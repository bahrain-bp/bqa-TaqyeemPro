import { Box, Text, Flex, Grid, GridItem, Spinner } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { fetchUserAttributes, getCurrentUser } from "@aws-amplify/auth";

export default function Account() {
  const [userAttributes, setUserAttributes] = useState({});
  const [loading, setLoading] = useState(true);
  const [schoolName, setSchoolName] = useState("");

  useEffect(() => {
    const fetchAttributes = async () => {
      try {
        const user = await getCurrentUser();
        const attributes = await fetchUserAttributes();

        setUserAttributes(attributes);

        // Load school list from public folder
        const res = await fetch("/bahrain_schools_list.json");
        const schoolList = await res.json();

        // Get schoolId from Cognito attributes
        const schoolId = attributes["custom:school"];

        // Find the matching school name
        const matched = schoolList.find(
          (s) => String(s.id) === String(schoolId)
        );
        setSchoolName(matched?.name || "Unknown School");
      } catch (error) {
        console.error("Error fetching user attributes:", error);
      } finally {
        setLoading(false);
        console.log("User Attributes:", userAttributes);
      }
    };

    fetchAttributes();
  }, []);

  if (loading) {
    return (
      <Flex justifyContent="center" alignItems="center">
        <Spinner size="lg" />
      </Flex>
    );
  }

  return (
    <Box p={8} maxW={"5xl"} mx={"auto"}>
      <Text fontSize="3xl" fontWeight="bold" mb={7}>
        Account
      </Text>

      {/* Header */}
      <Box
        bg="white"
        borderRadius="md"
        p={6}
        mb={8}
        color="black"
        boxShadow="md"
      >
        <Flex align="center">
          <Box color="black">
            <Text fontWeight="bold" fontSize="xl">
              {userAttributes.given_name} {userAttributes.family_name}
            </Text>
            <Text color="gray.600">
              {userAttributes["custom:school"] ? "Student" : "Moderator"}
            </Text>
            <Text color="gray.600">{schoolName}</Text>
          </Box>
        </Flex>
      </Box>

      {/* Personal Information */}
      <Box
        bg="white"
        borderRadius="md"
        p={6}
        mb={8}
        color="black"
        boxShadow="md"
      >
        <Flex justify="space-between" mb={4}>
          <Text fontWeight="bold" fontSize="lg">
            Personal Information
          </Text>
        </Flex>

        <Grid
          templateColumns={{ base: "repeat(1, 1fr)", md: "repeat(3, 1fr)" }}
          gap={4}
        >
          <GridItem>
            <Text>First Name</Text>
            <Text fontWeight="bold">{userAttributes.given_name || "N/A"}</Text>
          </GridItem>
          <GridItem>
            <Text>Last Name</Text>
            <Text fontWeight="bold">{userAttributes.family_name || "N/A"}</Text>
          </GridItem>
          <GridItem>
            <Text>Date of Birth</Text>
            <Text fontWeight="bold">{userAttributes.birthdate || "N/A"}</Text>
          </GridItem>
          <GridItem>
            <Text>Email Address</Text>
            <Text fontWeight="bold">{userAttributes.email || "N/A"}</Text>
          </GridItem>
          {userAttributes.phone_number && (
            <GridItem>
              <Text>Phone Number</Text>
              <Text fontWeight="bold">{userAttributes.phone_number}</Text>
            </GridItem>
          )}
          {userAttributes["custom:grade"] && (
            <GridItem>
              <Text>Grade</Text>
              <Text fontWeight="bold">{userAttributes["custom:grade"] || "N/A"}</Text>
            </GridItem>
          )}
        </Grid>
      </Box>
    </Box>
  );
}