/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import './List.scss';

const List = ({ data, ItemEl, getKey, itemProps, cls = '' }) => (
  <div className={cx('list', cls)}>
    {data.map((point) => (
      <ItemEl key={getKey(point)} {...itemProps(point)} />
    ))}
  </div>
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
