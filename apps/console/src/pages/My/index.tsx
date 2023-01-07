import { FC, Suspense, useState } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import {
  Box,
  Button,
  FileButton,
  Grid,
  Group,
  MediaQuery,
  Text,
} from '@mantine/core';
import { CoreProjects } from '../../components';

const UserActivity: FC<any> = function () {
  return <Box></Box>;
};

const My = function () {
  // const { data } = useQuery(['own-projects'], projectsQuery, {
  //   suspense: true,
  // });

  const [file, setFile] = useState<File | null>(null);

  return (
    <>
      <Grid mt={30} grow style={{ flexWrap: 'nowrap' }}>
        <MediaQuery smallerThan="sm" styles={{ display: 'none' }}>
          <Grid.Col span={9}>
            <Group position="center">
              <FileButton onChange={setFile} accept="image/png,image/jpeg">
                {(props) => <Button {...props}>Upload image</Button>}
              </FileButton>
            </Group>
            {file && (
              <Text size="sm" align="center" mt="sm">
                Picked file: {file.name}
              </Text>
            )}
            {/* <UserActivity /> */}
          </Grid.Col>
        </MediaQuery>
        <Grid.Col span={3}>
          <CoreProjects list={[]} col={{ sm: 12 }} hiddenCover hiddenMember />
          {/* <ProjectFlow pins={data.d} list={data.d} /> */}
        </Grid.Col>
      </Grid>
    </>
  );
};

export const MyPage = function () {
  return (
    <ErrorBoundary fallbackRender={() => <div>Error</div>}>
      <Suspense>
        <Box m={20} mt={40}>
          <My />
        </Box>
      </Suspense>
    </ErrorBoundary>
  );
};
