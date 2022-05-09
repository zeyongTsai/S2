import React from 'react';
import ReactDOM from 'react-dom';
import { SheetComponent } from '@antv/s2-react';
import '@antv/s2-react/dist/style.min.css';

fetch(
  'https://gw.alipayobjects.com/os/bmw-prod/e97a8fe6-1026-4fed-b420-cd7d0e88e8b4.json',
)
  .then((res) => res.json())
  .then((dataCfg) => {
    const s2Options = {
      width: 600,
      height: 480,
      cornerText: '指标层级',
      hierarchyType: 'customTree',
      style: {
        cellCfg: {
          valuesCfg: {
            originalValueField: 'originalValues',
            conditions: {
              text: {
                field: 'number',
                mapping: (value, cellInfo) => {
                  const { meta } = cellInfo;

                  if (meta.fieldValue.values[0][0] === value || !value) {
                    return {
                      fill: '#000',
                    };
                  }
                  return {
                    fill: value > 0 ? '#FF4D4F' : '#29A294',
                  };
                },
              },
            },
          },
        },
      },
    };

    ReactDOM.render(
      <SheetComponent
        dataCfg={dataCfg}
        options={s2Options}
        sheetType="strategy"
      />,
      document.getElementById('container'),
    );
  });