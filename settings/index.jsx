import MatchOptions from './match-options'
function settingsComponent(props) {
  return (
    <Page>
      <Section
        title={<Text bold align="center">Match Options</Text>}>
        {MatchOptions.renderMatchLength(props)}
        {MatchOptions.renderShortSet(props)}
        {MatchOptions.renderTiebreakAs3rdSet(props)}
        {MatchOptions.renderTiebreakScore(props)}
      </Section>
    </Page >
  );
}

registerSettingsPage(settingsComponent);
