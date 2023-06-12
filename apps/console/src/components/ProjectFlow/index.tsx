import { Project } from '@indiebase/trait';
import { Box, Text, Input, Center, Button } from '@mantine/core';
import { FC } from 'react';
import { ProjectStage } from './ProjectStage';
import { ProjectTile } from './ProjectTile';

export interface ProjectFlowProps {
  pins: Project[];
  list: Project[];
}

export const ProjectFlow: FC<ProjectFlowProps> = function (props) {
  return (
    <>
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
        {props.pins.length > 0 ? (
          <ProjectStage list={props.pins} col={{ lg: 4, md: 6 }} />
        ) : (
          <Center style={{ height: 100 }}>
            <Button size="sm" variant="subtle">
              No project pinned.
            </Button>
          </Center>
        )}
        <Box style={{ height: 20 }} />
        <Text
          component="span"
          variant="gradient"
          gradient={{ from: 'red', to: 'cyan', deg: 45 }}
          size="lg"
          weight={400}
        >
          All
        </Text>
        <Input
          mt={15}
          style={{ width: 300 }}
          variant="default"
          placeholder="Search project"
        />
        <Box my={20}>
          {props.list?.map((e, i) => {
            return (
              <ProjectTile
                key={i}
                name={e.name}
                members={e.members}
                updateTime={e.updateTime}
                status={e.status}
                description={e.description}
              />
            );
          })}
        </Box>
      </Box>
    </>
  );
};
