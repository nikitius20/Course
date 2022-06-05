import { render, screen } from '@testing-library/react';
import StartTest from '../StartTest';

describe("Rendering conponents",()=>{

  it('renders StartTest', () => {
    const {queryByTestId} = render(<StartTest />);
    expect(queryByTestId("StartTest")).toBeInTheDocument();
  });
  
  it('Not renders login fom', () => {
    const {queryByTestId} = render(<StartTest />);
    expect(queryByTestId("testing")).not.toBeInTheDocument();
  })
  
  it('Not renders register fom', () => {
    const {queryByTestId} = render(<StartTest />);
    expect(queryByTestId("result")).not.toBeInTheDocument();
  });
  
  it('renders btns', () => {
    const {queryAllByTestId} = render(<StartTest />);
    const allBtns = queryAllByTestId("button")
    allBtns.forEach((el)=>{
      expect(el).toBeInTheDocument();
    })
    
  });

  it('render all btns', () => {
    const {queryAllByTestId} = render(<StartTest />);
    expect(queryAllByTestId("button").length).toBe(2);
  });
  
})
