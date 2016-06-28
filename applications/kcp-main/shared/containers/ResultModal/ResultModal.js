import React, { Component } from 'react';
import { Modal, Button, Col } from 'react-bootstrap';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import ResultsListItem from '../../components/DefaultResult/resultsListItem';
import * as ColorPagesActions from '../../redux/actions';

export default class ResultModal extends Component {
  constructor(props) {
    super(props);
    this.handleSelect = this.handleSelect.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  galleryItems = this.props.aliases.map((alias, idx) => (
    <ResultsListItem image={`/media/alias/${alias}`} idx={idx} showImage={this.handleSelect} />
  ));

  handleSelect (imgIdx) { this.props.actions.changeImage(imgIdx); }

  handleClose () { this.props.actions.hideModal(false); }
  
  render () {
    return (
      <Modal className="Modal-Container" show={this.props.show} bsSize="large" aria-labelledby="contained-modal-title-lg">
        <Modal.Header closeButton={true} onHide={this.handleClose}/>
        <Modal.Body>
          <Col md={6} >
            <a href={`/media/alias/${this.props.aliases[this.props.imgIdx]}`} >
              <figure>
                <img src={`/media/alias/${this.props.aliases[this.props.imgIdx]}`} alt="" />
              </figure>
            </a>
          </Col>
          <Col md={6} >
            <div>
              {this.galleryItems}
            </div>
          </Col>
        </Modal.Body>
        <Modal.Footer>

        </Modal.Footer>
      </Modal>
    );
  }
}

const mapStateToProps = ({modal}) => {
  return (
    { show: modal.show, aliases: modal.aliases, imgIdx: modal.imgIdx, colIdx: modal.colIdx }
  );
}

const mapDispatchToProps = (dispatch) => (
  { actions: bindActionCreators(ColorPagesActions, dispatch) }
);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ResultModal);
