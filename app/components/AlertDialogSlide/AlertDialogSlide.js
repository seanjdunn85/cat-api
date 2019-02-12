import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

class AlertDialogSlide extends React.Component {
  state = {
    showError: false,
  };

  handleClickOpen = () => {
    this.setState({ showError: true });
  };

  handleClose = () => {
    this.setState({ showError: false });
    this.props.closeModal();
  };



  render() {
    
    const {modal} = this.props;
    console.log('re-rendering cat modal', modal)
    if(typeof(modal) == 'undefined'){
      this.state.showError = false;
    }else{
      this.state.showError = modal.showError;
    }

    return (
      <div>
        <Dialog
          open = {this.state.showError}
          TransitionComponent={Transition}
          keepMounted
          onClose={this.handleClose}
          aria-labelledby="alert-dialog-slide-title"
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle id="alert-dialog-slide-title">
            {"There was an error, but it wasn't your fault"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-slide-description">
              The server didn't respond. We're sorry that your favorite cats are currently unavailable.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Ok
            </Button>

          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default AlertDialogSlide;