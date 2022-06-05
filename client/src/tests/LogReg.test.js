import { render, screen } from '@testing-library/react';
import LogReg from '../LogReg';

describe("Rendering conponents",()=>{

  it('renders LogReg', () => {
    const {queryByTestId} = render(<LogReg />);
    expect(queryByTestId("LogReg")).toBeInTheDocument();
  });
  
  it('Not renders login fom', () => {
    const {queryByTestId} = render(<LogReg />);
    expect(queryByTestId("login")).not.toBeInTheDocument();
  });
  
  it('Not renders register fom', () => {
    const {queryByTestId} = render(<LogReg />);
    expect(queryByTestId("register")).not.toBeInTheDocument();
  });
  
  it('renders btns', () => {
    const {queryAllByTestId} = render(<LogReg />);
    const allBtns = queryAllByTestId("button")
    allBtns.forEach((el)=>{
      expect(el).toBeInTheDocument();
    })
    
  });

  it('render all btns', () => {
    const {queryAllByTestId} = render(<LogReg />);
    expect(queryAllByTestId("button").length).toBe(2);
  });
  
})
