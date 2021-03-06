import React from 'react';

import { Button } from 'components/Button';
import { SelectableCard } from 'components/SelectableCard';
import { IPlexAccountServer } from 'graphql/queries/plexAccountServers';
import { FiLink, FiX } from 'react-icons/fi';

export interface AddSubscriptionProps {
  server: IPlexAccountServer;
  linkServer: (machineIdentifier: string) => void;
  linked?: boolean;
}

export const AddSubscription = ({
  server,
  linkServer,
  linked,
}: AddSubscriptionProps): JSX.Element => {
  return (
    <SelectableCard status={linked ? "success" : "pening"}>
      <div className="flex justify-between w-full">
        <div className="my-auto font-medium">{server.name}</div>
        {linked ? (
          <Button
            onClick={(): void => {
              //
            }}
            rightIcon={<FiX />}
          >
            Unlink
          </Button>
        ) : (
          <Button
            onClick={(): void => {
              linkServer(server.machineIdentifier);
            }}
            rightIcon={<FiLink />}
          >
            Link
          </Button>
        )}
      </div>
    </SelectableCard>
  );
};
