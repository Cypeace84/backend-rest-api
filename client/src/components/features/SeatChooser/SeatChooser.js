import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Progress, Alert } from 'reactstrap';
import {
  getSeats,
  loadSeatsRequest,
  loadSeats,
  getRequests,
} from '../../../redux/seatsRedux';
import './SeatChooser.scss';
import io from 'socket.io-client';

const SeatChooser = ({ chosenDay, chosenSeat, updateSeat }) => {
  const dispatch = useDispatch();
  const seats = useSelector(getSeats);
  console.log('seats:', seats);
  const requests = useSelector(getRequests);

  const socket = io('http://localhost:8001');

  socket.on('connection', () => {
    console.log('Connected to server');
  });

  socket.on('disconnect', () => {
    console.log('Disconnected from server');
  });

  // useEffect(() => {
  //   dispatch(loadSeatsRequest());
  //   ////////////////////////////////////////////////////////////////////
  //   const intervalId = setInterval(() => {
  //     dispatch(loadSeatsRequest());
  //   }, 120000);

  //   return () => {
  //     clearInterval(intervalId);
  //   };
  //   ////////////////////////////////////////////////////////////////////
  // }, [dispatch]);
  useEffect(() => {
    // dispatch(loadSeats());
    if (seats.length === 0) {
      dispatch(loadSeatsRequest());
    }

    const handleSeatsUpdated = (updatedSeats) => {
      dispatch(loadSeats(updatedSeats));
    };
    // Nasłuchuj zdarzenia 'seatsUpdated'
    // Sprawdź, czy tablica seats jest pusta przed dodaniem nasłuchu na zdarzenie 'seatsUpdated'
    if (seats.length > 0) {
      socket.on('seatsUpdated', handleSeatsUpdated);
    }
    // socket.on('seatsUpdated', (updatedSeats) => {
    //   dispatch(loadSeats(updatedSeats));
    // });

    return () => {
      // socket.off('seatsUpdated');
      socket.off('seatsUpdated', handleSeatsUpdated);
    };
  }, [dispatch, seats.length]);

  const isTaken = (seatId) => {
    return seats.some((item) => item.seat === seatId && item.day === chosenDay);
  };

  const prepareSeat = (seatId) => {
    if (seatId === chosenSeat)
      return (
        <Button key={seatId} className='seats__seat' color='primary'>
          {seatId}
        </Button>
      );
    else if (isTaken(seatId))
      return (
        <Button key={seatId} className='seats__seat' disabled color='secondary'>
          {seatId}
        </Button>
      );
    else
      return (
        <Button
          key={seatId}
          color='primary'
          className='seats__seat'
          outline
          onClick={(e) => updateSeat(e, seatId)}
        >
          {seatId}
        </Button>
      );
  };

  const countFreeSeats = () => {
    const takenSeats = seats.filter((item) => item.day === chosenDay);
    const freeSeats = 50 - takenSeats.length;
    return freeSeats;
  };

  return (
    <div>
      <h3>Pick a seat</h3>
      <small id='pickHelp' className='form-text text-muted ml-2'>
        <Button color='secondary' /> – seat is already taken
      </small>
      <small id='pickHelpTwo' className='form-text text-muted ml-2 mb-4'>
        <Button outline color='primary' /> – it's empty
      </small>
      {requests['LOAD_SEATS'] && requests['LOAD_SEATS'].success && (
        <div className='seats'>
          {[...Array(50)].map((x, i) => prepareSeat(i + 1))}
        </div>
      )}
      {requests['LOAD_SEATS'] && requests['LOAD_SEATS'].pending && (
        <Progress animated color='primary' value={50} />
      )}
      {requests['LOAD_SEATS'] && requests['LOAD_SEATS'].error && (
        <Alert color='warning'>Couldn't load seats...</Alert>
      )}
      <p>Free seats: {countFreeSeats()}/50</p>
    </div>
  );
};

export default SeatChooser;
