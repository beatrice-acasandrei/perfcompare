import { useState } from 'react';

import AppleIcon from '@mui/icons-material/Apple';
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import RefreshOutlinedIcon from '@mui/icons-material/RefreshOutlined';
import TimelineIcon from '@mui/icons-material/Timeline';
import { IconButton, TableRow, TableCell } from '@mui/material';
import { style } from 'typestyle';

import { ExpandableRowStyles } from '../../../styles';
import { Colors, Spacing } from '../../../styles';
import RevisionRowExpandable from './RevisionRowExpandable';

interface Expanded {
  expanded: boolean;
  class: string;
}


function RevisionRow(props: RevisionRowProps) {
  const { themeMode } = props;

  const [row, setExpanded] = useState<Expanded>({
    expanded: false,
    class: 'default',
  });

  const toggleIsExpanded = () => {
    setExpanded({
      expanded: !row.expanded,
      class: row.expanded ? 'default' : 'expanded',
    });
  };

  const stylesCard = ExpandableRowStyles(themeMode);

  const themeColor200 =
    themeMode == 'light' ? Colors.Background200 : Colors.Background200Dark;
  const themeColor300 =
    themeMode == 'light' ? Colors.Background300 : Colors.Background300Dark;

  const styles = {
    revisionRow: style({
      $nest: {
        '.base-value': {
          backgroundColor: themeColor200,
        },
        '.confidence': {
          backgroundColor: themeColor200,
          textAlign: 'center',
        },
        '.comparison-sign': {
          backgroundColor: themeColor200,
          textAlign: 'center',
        },
        '.delta': {
          backgroundColor: themeColor200,
          textAlign: 'center',
          marginBottom: Spacing.Small,
        },
        '.expand-button-container': {
          textAlign: 'right',
        },
        '.new-value': {
          backgroundColor: themeColor200,
          textAlign: 'center',
        },
        '.platform-container': {
          alignItems: 'center',
          backgroundColor: themeColor200,
          display: 'flex',
        },
        '.retrigger-button': {
          backgroundColor: themeColor200,
          cursor: 'not-allowed',
          textAlign: 'center',
        },
        '.status': {
          backgroundColor: themeColor200,
          textAlign: 'center',
        },
        '.total-runs': {
          backgroundColor: themeColor200,
        },
        '.cell-button': {
          backgroundColor: themeColor200,
          paddingTop: '3px',
          textAlign: 'right',
          width: '16px',
        },
        '.download': {
          cursor: 'not-allowed',
        },
        '.expand-button': {
          backgroundColor: themeColor300,
        },
        '.MuiTableCell-root:first-child': {
          borderRadius: '10px 0 0 10px',
          backgroundColor: themeColor200,
        },
        '.MuiTableCell-root:nth-last-child(2)': {
          borderRadius: '0 10px 10px 0',
          backgroundColor: themeColor200,
        },
      },
    }),
  };
  return (
    <>
    <TableRow className={`revisionRow ${styles.revisionRow}`}>
      <TableCell className='platform'>
        <div className='platform-container'>
          <AppleIcon />
          <span>Apple</span>
        </div>
      </TableCell>
      <TableCell className='base-value'>
        <div className='base-container'>771.39ms</div>
      </TableCell>
      <TableCell className='comparison-sign'>&gt;</TableCell>
      <TableCell className='new-value'>771.39ms</TableCell>
      <TableCell className='status'>Improvement</TableCell>
      <TableCell className='delta'>2.5%</TableCell>
      <TableCell className='confidence'>High</TableCell>
      <TableCell className='total-runs'>
        <span>B:</span>
        <strong>23</strong> <span>N:</span>
        <strong>27</strong>
      </TableCell>
      <TableCell className='cell-button graph'>
        <div className='graph-link-button-container'>
          <IconButton aria-label='graph link' size='small'>
            <TimelineIcon />
          </IconButton>
        </div>
      </TableCell>
      <TableCell className='cell-button download'>
        <div className='download-button-container'>
          <IconButton aria-label='download' size='small' disabled>
            <FileDownloadOutlinedIcon />
          </IconButton>
        </div>
      </TableCell>
      <TableCell className='cell-button retrigger-button'>
        <div className='runs-button-container'>
          <IconButton aria-label='retrigger button' size='small' disabled>
            <RefreshOutlinedIcon />
          </IconButton>
        </div>
      </TableCell>
      <TableCell className='cell-button expand-button'>
        <div className='expand-button-container' onClick={toggleIsExpanded}>
          <IconButton
            aria-label='expand row'
            size='small'
          >
            <KeyboardArrowDownIcon />
          </IconButton>
        </div>
      </TableCell>
    </TableRow>
    <TableRow>
      <TableCell colSpan={12}>
        <RevisionRowExpandable themeMode={themeMode}/>
      </TableCell>
    </TableRow>

    <div className={`content-row content-row--${row.class} ${stylesCard.container} `}>
    <TableRow>
      <TableCell colSpan={12}>
        <RevisionRowExpandable themeMode={themeMode}/>
      </TableCell>
    </TableRow>
    </div>
    </>
  );
}

interface RevisionRowProps {
  themeMode: 'light' | 'dark';
}

export default RevisionRow;
