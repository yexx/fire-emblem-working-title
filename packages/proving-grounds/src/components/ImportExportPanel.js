// @flow
import React from 'react';
import Router from 'next/router';
import Clippy from 'react-icons/lib/go/clippy';

import ShareButton from './ShareButton';
import {
  colors,
  fontFamilies,
  fontSizes,
  lineHeights,
} from '../theme';
import type { Dispatch } from '../reducer';


type Props = {
  dispatch: Dispatch;
  onChange: (value: string) => void;
  value: string;
};

const GUTTER_SIZE = 15;

const ImportExportPanel = ({
  dispatch,
  onChange,
  value,
}: Props) => (
  <div className="root">
    <style jsx>{`
      .root {
        position: relative;
        width: 100%;
      }
      .share-link {
        bottom: 0;
        position: absolute;
        right: 0;
      }
      textarea {
        background: none;
        border: none;
        box-sizing: border-box;
        color: ${colors.aquaIsland};
        font-family: ${fontFamilies.ui};
        font-size: ${fontSizes.medium}px;
        line-height: ${lineHeights.body};
        padding: ${GUTTER_SIZE}px;
        resize: none;
        width: 100%;
      }
      textarea:focus {
        color: ${colors.iceberg};
        outline: none;
      }
    `}</style>
    <textarea
      name="export-import"
      onChange={event => onChange(event.target.value)}
      rows="20"
      spellCheck={false}
      value={value}
    />
    <div className="share-link">
      <ShareButton
        icon={Clippy}
        link={value}
        onClick={link => {
          dispatch({
            type: 'ENQUEUE_NOTIFICATION',
            value: 'Build copied to clipboard!',
            meta: {
              analytics: {
                type: 'COPIED_EXPORT_TEXT',
                payload: {
                  link,
                },
              },
            },
          });
          Router.back();
        }}
        title="Copy to clipboard"
      />
    </div>
  </div>
);

export default ImportExportPanel;