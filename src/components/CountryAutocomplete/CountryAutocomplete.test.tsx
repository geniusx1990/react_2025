import { render, screen, fireEvent } from '@testing-library/react';
import CountryAutocomplete from './CountryAutocomplete';
import {useFormsStore} from "@/store/formsStore";

test('filters and selects country', () => {
    useFormsStore.getState().setCountries(['Lithuania', 'Latvia', 'Estonia']);
    const onChange = jest.fn();
    render(<CountryAutocomplete value="" onChange={onChange} />);
    const input = screen.getByLabelText(/country/i);
    fireEvent.change(input, { target: { value: 'li' } });
    fireEvent.click(screen.getByText('Lithuania'));
    expect(onChange).toHaveBeenCalledWith('Lithuania');
});
