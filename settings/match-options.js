const MATCH_LENGTH = "match-length"
const SHORT_SET_MODE = "short-set-mode"
const TIEBREAK_AS_3RD_SET = "tiebreak-as-last-set";

const MATCH_LENGTH_OPTIONS = [
  { name: "1 Set", value: "1" },
  { name: "3 Sets", value: "3" },
  { name: "5 Sets", value: "5" },
  { name: "Tiebreak only", value: "0" }
]

const DEFAULT_MATCH_LENGTH = JSON.stringify({
  values: [MATCH_LENGTH_OPTIONS[1]],
  selected: [1]
});

const renderMatchLength = (props) => {
  return (
    <Select
      label={
        <TextImageRow label="Match Length" />
      }
      settingsKey={MATCH_LENGTH}
      options={MATCH_LENGTH_OPTIONS}
    />
  )
}

const renderShortSet = (props) => {
  if ( matchLength(props) != "0" ) {
    return (
      <Toggle
        settingsKey={SHORT_SET_MODE}
        label={
          <TextImageRow
            label="Short Set Mode"
            sublabel="The set ends when a player wins 4 games"
          />
        }
      />
    )
  }
}

const renderTiebreakAs3rdSet = (props) => {
  if ( matchLength(props) != "0" ) {
    return (
      <Toggle
        settingsKey={TIEBREAK_AS_3RD_SET}
        label={
          <TextImageRow
            label="Tiebreak as 3rd Set"
            sublabel="3rd Set is replaced by a Tiebreak"
          />
        }
      />
    )
  }
}

const renderTiebreakScore = (props) => {
  return (
    <Select
      label={
        <TextImageRow label="Tiebreak Score" />
      }
      settingsKey="tiebreak-score"
      options={[
        { name: "5 point" },
        { name: "7 point" },
        { name: "10 point" },
        { name: "15 point" }
      ]}
    />
  )
}

const matchLength = (props) => {
  const rawValue = props.settingsStorage.getItem(MATCH_LENGTH) || DEFAULT_MATCH_LENGTH;
  const jsonValue = JSON.parse(rawValue);

  return jsonValue.values[0].value;
}

export default {
  renderMatchLength,
  renderShortSet,
  renderTiebreakAs3rdSet,
  renderTiebreakScore
}
