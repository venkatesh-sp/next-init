import LoginForm from '@/components/forms/login';

const LoginPage = () => {
  return (
    <div className="container-fluid h-100">
      <div className="row h-100">
        <div className="col-8 login-bg">
          <div className="d-flex align-items-center justify-content-center h-100 text-white">
            <div className="lh-sm">
              <p className="fs-3 m-0">INTUITIVE</p>
              <p className="fs-1 m-0 fw-bolder display-1">
                <b>ENTERTAINMENT</b>
              </p>
              <p className="fs-3 m-0">SOFTWARE</p>
            </div>
          </div>
        </div>
        <div className="col-4">
          <div className="d-flex h-100 flex-column">
            <LoginForm />
            <div className="mt-auto text-center">
              <div>
                <small>If you need help, contact support</small>
              </div>

              <div>
                <small>Please email support or call 805-428-8024</small>
              </div>

              <div>
                <small>Powered by Resilient Software Solutions LLC</small>
              </div>
              <div className="d-flex justify-content-around">
                <small>Terms & Conditions</small>
                <small>Privacy Policy</small>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
