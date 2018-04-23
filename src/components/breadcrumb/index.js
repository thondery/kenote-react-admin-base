import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Breadcrumb } from 'antd'
import { Link } from 'react-router-dom'
import './style.scss'

export default ({ data }) => data ? (
  <Breadcrumb>
    {data.map( (item, i) => {
      return (
        <Breadcrumb.Item key={i}>
          {item.link ? (
            <Link to={item.link}>{item.name}</Link>
          ) : item.name}
        </Breadcrumb.Item>
      )
    })}
  </Breadcrumb>
) : null
