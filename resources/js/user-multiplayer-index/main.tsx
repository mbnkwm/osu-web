// Copyright (c) ppy Pty Ltd <contact@ppy.sh>. Licensed under the GNU Affero General Public License v3.0.
// See the LICENCE file in the repository root for full licence text.

import HeaderV4 from 'components/header-v4';
import ProfileTournamentBanner from 'components/profile-tournament-banner';
import UserProfileContainer from 'components/user-profile-container';
import UserExtendedJson from 'interfaces/user-extended-json';
import core from 'osu-core-singleton';
import Badges from 'profile-page/badges';
import Cover from 'profile-page/cover';
import DetailBar from 'profile-page/detail-bar';
import headerLinks from 'profile-page/header-links';
import * as React from 'react';
import MultiplayerHistory from 'user-multiplayer-index/multiplayer-history';
import { trans } from 'utils/lang';
import MultiplayerHistoryStore from './multiplayer-history-store';

interface Props {
  store: MultiplayerHistoryStore;
  user: UserExtendedJson;
}

export default function Main(props: Props) {
  return (
    <UserProfileContainer user={props.user}>
      <HeaderV4
        backgroundImage={props.user.cover.url}
        links={headerLinks(props.user, props.store.typeGroup)}
        // add space for warning banner when user is blocked
        modifiers={{ restricted: core.currentUserModel.blocks.has(props.user.id) || props.user.is_restricted }}
        theme='users'
      />

      <div className='osu-page osu-page--generic-compact'>
        <Cover coverUrl={props.user.cover.url} currentMode={props.user.playmode} user={props.user} />

        <ProfileTournamentBanner banner={props.user.active_tournament_banner} />

        <div className='profile-detail'>
          <Badges badges={props.user.badges} />
        </div>

        <DetailBar user={props.user} />

        <div className='user-profile-pages user-profile-pages--no-tabs'>
          <div className='page-extra'>
            <h2 className='title title--page-extra'>{trans(`users.show.extra.${props.store.typeGroup}.title`)}</h2>
            <MultiplayerHistory store={props.store} user={props.user} />
          </div>
        </div>
      </div>
    </UserProfileContainer>
  );
}
