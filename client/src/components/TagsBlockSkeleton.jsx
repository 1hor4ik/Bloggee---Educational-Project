import { Skeleton, Box, Flex, Stack } from "@chakra-ui/react";

function TagsBlockSkeleton() {
  return (
    <Box className="tagsBlockWrapper" mb={8}>
      <Skeleton height="30px" width="120px" mb={4} />
      <Stack spacing={3}>
        {[...Array(5)].map((_, index) => (
          <Flex className="tagsList" key={index} align="center">
            <Skeleton height="20px" width="20px" mr={2} />
            <Skeleton height="20px" width="100px" />
          </Flex>
        ))}
      </Stack>
    </Box>
  );
}

export default TagsBlockSkeleton;
