import { Skeleton, SkeletonText, Box, Flex } from "@chakra-ui/react";

function FullPostSkeleton() {
  return (
    <Box className="fullPostWrapper" p={4} mb={8}>
      <Skeleton height="400px" width="100%" mb={4} />

      <Flex justifyContent="space-between" alignItems="center" mb={2}>
        <Skeleton height="20px" width="150px" />
        <Skeleton height="20px" width="100px" />
      </Flex>

      <Skeleton height="30px" width="80%" mb={4} />

      <SkeletonText noOfLines={4} spacing={4} skeletonHeight="20px" />

      <Flex gap={2} mt={4} mb={4}>
        <Skeleton height="25px" width="60px" />
        <Skeleton height="25px" width="60px" />
        <Skeleton height="25px" width="60px" />
      </Flex>

      <Flex justifyContent="space-between" mt={4}>
        <Skeleton height="20px" width="80px" />
        <Skeleton height="20px" width="80px" />
      </Flex>
    </Box>
  );
}

export default FullPostSkeleton;
