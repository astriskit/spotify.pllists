/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import './List.scss';

const List = React.forwardRef(
  ({ data, ItemEl, getKey, itemProps, cls = '' }, ref) => (
    <div className={cx('list', cls)} ref={ref}>
      {data.map((point) => (
        <ItemEl key={getKey(point)} {...itemProps(point)} />
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
};

List.defaultProps = {
  cls: '',
};

export default List;
