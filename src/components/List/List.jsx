/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import './List.scss';

const List = React.forwardRef(
  ({ data, ItemEl, getKey, itemProps, cls = '', numbered }, ref) => (
    <div className={cx('list', cls)} ref={ref}>
      {data.map((point, index) => (
        <div
          key={getKey(point)}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          {numbered && <span>{index + 1}</span>}&nbsp;
          <ItemEl {...itemProps(point)} />
        </div>
      ))}
    </div>
  ),
);

List.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  ItemEl: PropTypes.elementType.isRequired,
  cls: PropTypes.string,
  itemProps: PropTypes.func.isRequired,
  getKey: PropTypes.func.isRequired,
  numbered: PropTypes.bool,
};

List.defaultProps = {
  cls: '',
  numbered: false,
};

export default List;
