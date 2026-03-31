import ReplayIcon from '@mui/icons-material/Replay';

export default function ErrorMessage({ message }) {
  return( 
    <div className="ErrorMessage" >
        <p> { message } </p>
        <button id="ErrorRefreshbtn" onClick={refreshPage} >
            <ReplayIcon />
            refresh
        </button>
    </div>
  );
}

function refreshPage() {
  window.location.reload();
}
