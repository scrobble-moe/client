import React from 'react';

import { Button, LinkButton } from 'components/Button';
import { Card } from 'components/Card';
import { plexOauth } from 'util/plex';

const Auth = (): JSX.Element => {
  const [plexUrl, setPlexUrl] = React.useState<string>();

  const getPlexAuthUrl = async (): Promise<void> => {
    const [url, pin] = await plexOauth.requestHostedLoginURL();
    setPlexUrl(url);
    localStorage.setItem("plexPin", pin.toString());
  };

  React.useEffect(() => {
    void getPlexAuthUrl();
  }, []);

  return (
    <Card title="Sign in with Plex">
      <div>
        {plexUrl ? (
          <LinkButton href={plexUrl}>Sign In</LinkButton>
        ) : (
          <Button>Loading</Button>
        )}
      </div>
    </Card>
  );
};

export default Auth;
