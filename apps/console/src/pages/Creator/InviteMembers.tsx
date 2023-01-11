import { useViewportSize } from '@mantine/hooks';
import { FC } from 'react';
import { Global, Text } from '@mantine/core';
import ReactConfetti from 'react-confetti';
import { useRemoveAppShellLeftPadding } from '@letscollab-community/console-utils';

export interface InviteMembersProps {
  confetti?: boolean;
}

export const InviteMembers: FC<InviteMembersProps> = function ({ confetti }) {
  const { height, width } = useViewportSize();

  useRemoveAppShellLeftPadding();

  return (
    <div>
      <ReactConfetti
        width={width - 16}
        height={height}
        run={confetti}
        recycle={false}
        numberOfPieces={300}
        wind={0}
        gravity={0.1}
        style={{
          zIndex: 999,
        }}
        initialVelocityX={2}
        initialVelocityY={5}
        opacity={1}
      />
      <Global styles={(theme) => ({})} />

      <Text
        variant="gradient"
        gradient={{ from: 'teal', to: 'lime' }}
        fw={700}
        size={32}
        ta="center"
      >
        Create Organization Successfully !
      </Text>
    </div>
  );
};

InviteMembers.defaultProps = {
  confetti: false,
};
