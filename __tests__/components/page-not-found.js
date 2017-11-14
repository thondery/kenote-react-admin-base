import React from 'react'
import renderer from 'react-test-renderer'
import { PageNotFound } from 'components'

test('component => PageNotFound', () => {
  const component = renderer.create(
    <PageNotFound />
  )
  expect(component).toMatchSnapshot()
  expect(component.toJSON().type).toEqual('div')
  expect(component.toJSON().props.className).toEqual('layout-page-not-found')
  expect(component.toJSON().children[0].type).toEqual('div')
  expect(component.toJSON().children[0].props.className).toEqual('page-not-found')
  expect(component.toJSON().children[0].children[0].type).toEqual('h1')
  expect(component.toJSON().children[0].children[0].children[0]).toEqual('404')
  expect(component.toJSON().children[0].children[1].type).toEqual('div')
  expect(component.toJSON().children[0].children[1].children[0].type).toEqual('h2')
  expect(component.toJSON().children[0].children[1].children[0].children[0]).toEqual('This page could not be found.')
})