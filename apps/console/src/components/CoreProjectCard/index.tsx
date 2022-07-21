import {
  Card,
  Group,
  Badge,
  Image,
  Text,
  Box,
  Avatar,
  AvatarsGroup,
  MantineColor,
  Anchor,
  Center,
  Button,
  Stack,
  useMantineTheme,
  Grid,
} from '@mantine/core';
import { getStatusColor } from '../utils';
import {
  IconUser,
  IconWallet,
  IconArrowNarrowUp,
  IconUsers,
} from '@tabler/icons';
import { IProject } from '@letscollab/app-utils';
import CurrencyFormat from 'react-currency-format';
import { Link } from 'react-router-dom';
import { FC, useEffect, useMemo, useRef } from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

export interface CoreProjectCardProps extends Partial<IProject> {}

export const CoreProjectCard: FC<CoreProjectCardProps> = function (props) {
  const color: MantineColor = getStatusColor(props.status);
  const { id } = props;
  const theme = useMantineTheme();

  const {
    active,
    attributes,
    isDragging,
    isSorting,
    listeners,
    overIndex,
    setNodeRef,
    setActivatorNodeRef,
    transform,
    transition,
  } = useSortable({
    id,
  });

  useEffect(() => {
    if (!isDragging) {
      return;
    }

    document.body.style.cursor = 'grabbing';

    return () => {
      document.body.style.cursor = '';
    };
  }, [isDragging]);

  return (
    <Grid.Col
      style={{
        zIndex: isDragging ? 999 : 0,
        opacity: isDragging ? 0.8 : 1,
        transform: CSS.Transform.toString(transform),
        transition,
      }}
      ref={setNodeRef}
      lg={4}
      md={6}
      {...attributes}
    >
      <Card
        p="xs"
        pt={0}
        style={{
          border: '1px solid #E2E2E2',
        }}
      >
        <Center
          sx={{
            '&:hover': {
              cursor: 'grabbing',
            },
            touchAction: 'manipulation',
          }}
          {...listeners}
          ref={setActivatorNodeRef}
          style={{ height: 16 }}
        >
          <Box
            sx={{
              width: 50,
              height: 3,
              borderRadius: 10,
              background: theme.colors.gray[3],
            }}
          ></Box>
        </Center>
        <Group position="apart" mb={7}>
          <Group spacing={5}>
            <Anchor
              to="/pro"
              component={Link}
              reloadDocument={false}
              size="sm"
              style={{ color: '#228be6', fontWeight: 700 }}
            >
              {props.name}
            </Anchor>
          </Group>
          <Badge size="xs" color={color} variant="light">
            {props.status}
          </Badge>
        </Group>
        <Card.Section>
          <div style={{ width: '100%', height: '100%' }}></div>
          <Image
            src={props.cover ? props.cover : '/images/project-cover.svg'}
            height={50}
            alt="cover"
          />
        </Card.Section>

        <Box style={{ height: 30 }}>
          <Text
            lineClamp={2}
            mt={10}
            style={{ color: '#777777', fontSize: 10 }}
          >
            {props.description}
          </Text>
        </Box>

        <Group mt={9} position="apart">
          <AvatarsGroup
            styles={(t) => ({
              truncated: {
                color: t.colors.green,
              },
            })}
            ml={-2}
            size="sm"
            limit={7}
          >
            {props.members.map((u, i) => {
              return (
                <Avatar
                  key={i}
                  src={u.avatar}
                  component="a"
                  href={u.profileUrl}
                >
                  <IconUser size={14} />
                </Avatar>
              );
            })}
          </AvatarsGroup>
          <Center>
            <Text style={{ fontSize: 10 }} color="gray">
              Update
            </Text>
          </Center>
        </Group>
        <Group mt={9} position="right">
          <Center>
            <Button
              color="dark"
              radius="xs"
              size="xs"
              style={{ padding: 0 }}
              compact
              variant="white"
            >
              <IconUsers size={13} />
              <Text ml={3} style={{ lineHeight: 1 }} lineClamp={1} size="xs">
                1011231211
              </Text>
            </Button>
            <Button
              ml={3}
              color="dark"
              radius="xs"
              size="xs"
              style={{ padding: 0 }}
              compact
              variant="white"
            >
              <IconArrowNarrowUp size={12} color="green" />
              <Text
                color="green"
                style={{ lineHeight: 1, fontSize: 10 }}
                lineClamp={1}
              >
                0
              </Text>
            </Button>
          </Center>
          <Center>
            <Button
              color="dark"
              radius="xs"
              size="xs"
              style={{ padding: 0 }}
              compact
              variant="white"
            >
              <IconWallet size={14} />
              <CurrencyFormat
                value={132321}
                displayType={'text'}
                thousandSeparator={true}
                prefix={'$'}
                renderText={(value) => (
                  <Text
                    ml={3}
                    style={{ lineHeight: 1 }}
                    lineClamp={1}
                    size="xs"
                  >
                    {value}
                  </Text>
                )}
              />
            </Button>
            <Button
              ml={3}
              color="dark"
              radius="xs"
              size="xs"
              style={{ padding: 0 }}
              compact
              variant="white"
            >
              <IconArrowNarrowUp size={12} color="green" />
              <Text
                color="green"
                style={{ lineHeight: 1, fontSize: 10 }}
                lineClamp={1}
              >
                0
              </Text>
            </Button>
          </Center>
        </Group>
      </Card>
    </Grid.Col>
  );
};
