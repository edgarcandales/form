import {renderer} from 'react-test-renderer';
import RegistrationForm from '../../RegistrationForm/RegistrationForm';

test('renders correctly', () => {
  const tree = renderer.create(<RegistrationForm />).toJSON();
  expect(tree).toMatchSnapshot();
});
