import { render, screen } from '@testing-library/react';
import App from '../App';

describe("Rendering conponents",()=>{

  it('renders App', () => {
    const {queryByTestId} = render(<App />);
    expect(queryByTestId("app")).toBeInTheDocument();
  });
  
  it('Not renders user info in app, because it is not loged in', () => {
    const {queryByTestId} = render(<App />);
    expect(queryByTestId("user-info")).not.toBeInTheDocument();
  });
  
  it('renders btns', () => {
    const {queryAllByTestId} = render(<App />);
    const allBtns = queryAllByTestId("button")
    allBtns.forEach((el)=>{
      expect(el).toBeInTheDocument();
    })
    
  });

  it('render all btns', () => {
    const {queryAllByTestId} = render(<App />);
    expect(queryAllByTestId("button").length).toBe(5);
  });
  
})


// render(<App />);
// const linkElement = screen.getByText(/learn react/i);
// expect(linkElement).toBeInTheDocument();