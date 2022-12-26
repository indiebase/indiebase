import { IProject } from '@letscollab-nest/trait';
import { Box, Text, Input } from '@mantine/core';
import { FC } from 'react';
import { CoreProjects } from 'src/pages/Org/CoreProjects';
import { ProjectTile } from './ProjectTile';

export interface ProjectFlowProps {
  pins: IProject[];
  list: IProject[];
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
          Main
        </Text>
        <CoreProjects list={props.pins} />
        <Text
          component="span"
          variant="gradient"
          gradient={{ from: 'red', to: 'cyan', deg: 45 }}
          size="lg"
          weight={400}
        >
          Utils
        </Text>
        <Input
          mt={20}
          style={{ width: 300 }}
          variant="default"
          placeholder="Search project"
        />
        <Box my={20}>
          {props.list.map((e, i) => {
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
