import { Project } from '@letscollab/trait';
import { Box, Text, Center, Button } from '@mantine/core';
import { FC } from 'react';
import { ProjectStage } from './ProjectStage';

export interface PinnedProps {
  list: Project[];
}

export const PinnedProjects: FC<PinnedProps> = function (props) {
  return (
    <Box>
      <Text
        component="span"
        variant="gradient"
        gradient={{ from: 'red', to: 'cyan', deg: 45 }}
        size="lg"
        weight={400}
      >
        Pinned
      </Text>
      {props.list.length > 0 ? (
        <ProjectStage list={props.list} col={{ lg: 4, md: 6 }} />
      ) : (
        <Center style={{ height: 100 }}>
          <Button size="sm" variant="subtle">
            No project pinned.
          </Button>
        </Center>
      )}
      <Box style={{ height: 20 }} />
    </Box>
  );
};
