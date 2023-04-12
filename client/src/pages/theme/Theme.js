import React from 'react';


const Dashboard = () => {

  const fontChangeFun = (val)=>{
    document.querySelectorAll('.font-size-change').forEach((element) => {
      element.classList.remove('active');
    });
    switch(val) {
      case 1:
        document.documentElement.style.setProperty('--sticky-top-left', '5.4rem');
        document.documentElement.style.setProperty('--sticky-top-right', '5.4rem');
        document.querySelector('html').style.fontSize = '10px';
        document.querySelector('.font-size-1').classList.add('active');
        break;
      case 2:
        document.documentElement.style.setProperty('--sticky-top-left', '5.4rem');
        document.documentElement.style.setProperty('--sticky-top-right', '-7rem');
        document.querySelector('html').style.fontSize = '13px';
        document.querySelector('.font-size-2').classList.add('active');
        break;
      case 3:
        document.documentElement.style.setProperty('--sticky-top-left', '-2rem');
        document.documentElement.style.setProperty('--sticky-top-right', '-17rem');
        document.querySelector('html').style.fontSize = '16px';
        document.querySelector('.font-size-3').classList.add('active');
        break;
      case 4:
        document.documentElement.style.setProperty('--sticky-top-left', '-5rem');
        document.documentElement.style.setProperty('--sticky-top-right', '-25rem');
        document.querySelector('html').style.fontSize = '19px';
        document.querySelector('.font-size-4').classList.add('active');
        break;
      case 5:
        document.documentElement.style.setProperty('--sticky-top-left', '-12rem');
        document.documentElement.style.setProperty('--sticky-top-right', '-35rem');
        document.querySelector('html').style.fontSize = '22px';
        break;
      default:
        document.documentElement.style.setProperty('--sticky-top-left', '5.4rem');
        document.documentElement.style.setProperty('--sticky-top-right', '-7rem');
        document.querySelector('html').style.fontSize = '13px';
        document.querySelector('.font-size-2').classList.add('active');
    }
  }

  const colorChangeFun = (val)=>{
    document.querySelectorAll('.color-change').forEach((element) => {
      element.classList.remove('active');
    });
    switch(val) {
      case 1:
        document.documentElement.style.setProperty('--primary-color-hue', 252);
        document.querySelector('.color-1').classList.add('active');
        break;
      case 2:
        document.documentElement.style.setProperty('--primary-color-hue', 52);
        document.querySelector('.color-2').classList.add('active');
        break;
      case 3:
        document.documentElement.style.setProperty('--primary-color-hue', 352);
        document.querySelector('.color-3').classList.add('active');
        break;
      case 4:
        document.documentElement.style.setProperty('--primary-color-hue', 152);
        document.querySelector('.color-4').classList.add('active');
        break;
      case 5:
        document.documentElement.style.setProperty('--primary-color-hue', 202);
        document.querySelector('.color-5').classList.add('active');
        break;
      default:
        document.documentElement.style.setProperty('--primary-color-hue', 252);
        document.querySelector('.color-1').classList.add('active');
    }
  }

  const bgChangeFun = (val)=>{
    document.querySelectorAll('.bg-change').forEach((element) => {
      element.classList.remove('active');
    });
    switch(val) {
      case 1:
        document.documentElement.style.setProperty('--light-color-lightness', '95%');
        document.documentElement.style.setProperty('--white-color-lightness', '100%');
        document.documentElement.style.setProperty('--dark-color-lightness', '17%');       
        document.querySelector('.bg-1').classList.add('active');
        break;
      case 2:
        document.documentElement.style.setProperty('--light-color-lightness', '15%');
        document.documentElement.style.setProperty('--white-color-lightness', '20%');
        document.documentElement.style.setProperty('--dark-color-lightness', '95%');        
        document.querySelector('.bg-2').classList.add('active');
        break;
      case 3:
        document.documentElement.style.setProperty('--light-color-lightness', '0%');
        document.documentElement.style.setProperty('--white-color-lightness', '10%');
        document.documentElement.style.setProperty('--dark-color-lightness', '95%');        
        document.querySelector('.bg-3').classList.add('active');
        break;
      default:
        document.documentElement.style.setProperty('--light-color-lightness', '17%');
        document.documentElement.style.setProperty('--white-color-lightness', '100%');
        document.documentElement.style.setProperty('--dark-color-lightness', '95%');         
        document.querySelector('.bg-1').classList.add('active');
    }
  }
  
  return (
    <div className="customize-theme">
      <div className="card">
        <h2>Customize your view</h2>
        <p className="text-muted">
          Manage your font size, color, and background.
        </p>
        {/* <!-- --------FONT SIZES------------ --> */}
        <div className="font-size">
          <h4>Font Size</h4>
          <div>
            <h6>Aa</h6>
            <div className="choose-size">
              <span className="font-size-change font-size-1" onClick={()=>fontChangeFun(1)}></span>
              <span className="font-size-change font-size-2 active" onClick={()=>fontChangeFun(2)}></span>
              <span className="font-size-change font-size-3" onClick={()=>fontChangeFun(3)}></span>
              <span className="font-size-change font-size-4" onClick={()=>fontChangeFun(4)}></span>
              <span className="font-size-change font-size-5" onClick={()=>fontChangeFun(5)}></span>
            </div>
            <h3>Aa</h3>
          </div>
        </div>
        {/* <!-- --------END FONT SIZES------------ --> */}
        {/* <!-- --------PRIMARY COLORS------------ --> */}
        <div className="color">
          <h4>Color</h4>
          <div className="choose-color">
            <span className="color-change color-1 active" onClick={()=>colorChangeFun(1)}></span>
            <span className="color-change color-2" onClick={()=>colorChangeFun(2)}></span>
            <span className="color-change color-3" onClick={()=>colorChangeFun(3)}></span>
            <span className="color-change color-4" onClick={()=>colorChangeFun(4)}></span>
            <span className="color-change color-5" onClick={()=>colorChangeFun(5)}></span>
          </div>
        </div>
        {/* <!-- --------END PRIMARY COLORS------------ --> */}
        {/* <!-- --------BACKGROUND COLORS------------ --> */}
        <div className="background">
          <h4>Background</h4>
          <div className="choose-bg">
            <div className="bg-change bg-1 active" onClick={()=>bgChangeFun(1)}>
              <span></span>
              <h5 htmlFor="bg-1">Light</h5>
            </div>
            <div className="bg-change bg-2"  onClick={()=>bgChangeFun(2)}>
              <span></span>
              <h5>Dim</h5>
            </div>
            <div className="bg-change bg-3" onClick={()=>bgChangeFun(3)}>
              <span></span>
              <h5 htmlFor="bg-3">Lights Out</h5>
            </div>
          </div>
        </div>
      </div>
      {/* <!-- --------END BACKGROUND COLORS------------ --> */}
    </div>
  );
};

export default Dashboard;
