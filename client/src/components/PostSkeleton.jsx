import { Skeleton, Box, Flex } from "@chakra-ui/react";

function PostSkeleton() {
  return (
    <Box className="postWrapper" mb={8}>
      <Skeleton height="200px" width="100%" />

      <Flex justifyContent="space-between" alignItems="center" mt={2}>
        <Skeleton height="20px" width="80px" />
        <Skeleton height="20px" width="60px" />
      </Flex>

      <Skeleton height="25px" width="100%" mt={3} />

      <Skeleton height="16px" width="90%" mt={2} />
      <Skeleton height="16px" width="80%" />

      <Flex gap={2} mt={2}>
        <Skeleton height="20px" width="50px" />
        <Skeleton height="20px" width="50px" />
        <Skeleton height="20px" width="50px" />
      </Flex>

      <Flex justifyContent="space-between" mt={3}>
        <Skeleton height="20px" width="60px" />
        <Skeleton height="20px" width="60px" />
      </Flex>
    </Box>
  );
}

export default PostSkeleton;
