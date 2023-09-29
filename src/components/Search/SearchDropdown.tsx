import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { style, cssRule } from 'typestyle';

import { repoMap } from '../../common/constants';
import { compareView } from '../../common/constants';
import { useAppSelector } from '../../hooks/app';
import useHandleChangeDropdown from '../../hooks/useHandleChangeDropdown';
import {
  ButtonsLightRaw,
  ButtonsDarkRaw,
  TooltipRaw,
  FontsRaw,
  Colors,
} from '../../styles';
import { InputType, ThemeMode, View, ComparisonType } from '../../types/state';

interface SearchDropdownProps {
  view: View;
  selectLabel: string;
  tooltipText: string;
  mode: ThemeMode;
  searchType: InputType;
  comparisonType: ComparisonType;
}

function SearchDropdown({
  view,
  selectLabel,
  mode,
  searchType,
  comparisonType,
}: SearchDropdownProps) {
  const size = view == compareView ? 'small' : undefined;
  const { handleChangeDropdown } = useHandleChangeDropdown();
  let searchState = useAppSelector(
    (state) => state.searchCompareWithBase[searchType],
  );
  if (comparisonType == 'searchCompareOverTime') {
    searchState = useAppSelector((state) => state.searchCompareOverTime.new);
  }
  const { repository } = searchState;

  const handleRepoSelect = async (event: SelectChangeEvent) => {
    const selectedRepository = event.target.value;
    await handleChangeDropdown({
      selectedRepository,
      searchType,
      comparisonType,
    });
  };

  cssRule('.MuiTooltip-popper', {
    ...(mode === 'light' ? TooltipRaw.Light : TooltipRaw.Dark),
    $nest: {
      '.MuiTooltip-tooltip': {
        ...(mode === 'light' ? FontsRaw.BodySmall : FontsRaw.BodySmallDark),
        backgroundColor: Colors.ColorTransparent,
        padding: '0px',
        margin: '0px !important',
      },
    },
  });

  const styles = {
    container: style({
      width: '100%',

      $nest: {
        '.MuiInputBase-root': {
          ...(mode === 'light'
            ? ButtonsLightRaw.Dropdown
            : ButtonsDarkRaw.Dropdown),
        },
      },
    }),
  };

  return (
    <div>
      <FormControl
        size={size}
        className={`search-dropdown ${styles.container}`}
      >
        <Select
          data-testid={`dropdown-select-${searchType}`}
          label={selectLabel}
          value={repository}
          labelId='select-repository-label'
          className='dropdown-select'
          variant='standard'
          onChange={(e) => void handleRepoSelect(e)}
        >
          {Object.keys(repoMap).map((key) => (
            <MenuItem
              id={repoMap[key]}
              value={repoMap[key]}
              key={repoMap[key]}
              className={`${searchType}Repository`}
            >
              {repoMap[key]}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}

export default SearchDropdown;
