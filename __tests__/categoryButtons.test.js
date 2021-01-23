
import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom/extend-expect'
import CategoryControl from '../client/src/components/categoryButtons/CategoryControl'
import sampleData from '../__testData__/sampleData'


//basic render test, no data
describe('CategoryControl', () => {
  it('renders the CategoryControl component', () => {
    render(<CategoryControl categories={[]}/>);
    screen.debug();
  });
});


describe('CategoryControl', () => {
  it('renders the CategoryControl component', () => {
    render(<CategoryControl categories={sampleData.review_categories}/>);
    screen.debug();
  });
});

test('click', () => {
  render(
    <div>
      <label htmlFor="checkbox">Check</label>
      <input id="checkbox" type="checkbox" />
    </div>
  )

  userEvent.click(screen.getByText('Check'))
  expect(screen.getByLabelText('Check')).toBeChecked()
})