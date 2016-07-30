import LaunchReducer from '../view/launch/LaunchReducer';
import MessengerReducer from '../view/messenger/MessengerReducer';
import AccountReducer from '../view/account/AccountReducer';
import CardReducer from '../view/card/CardReducer';
import ContactReducer from '../view/contact/ContactReducer';
import TransferReducer from '../view/transfer/TransferReducer';

export default {
    launch : LaunchReducer,
    messenger : MessengerReducer,
    account : AccountReducer,
    card : CardReducer,
    contact : ContactReducer,
    transfer : TransferReducer
};
