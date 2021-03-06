import { h, Component } from 'preact';
import { route } from 'preact-router';

import Calculator from '../services/calculator';

import IconSunglasses from '../components/icon-sunglasses';

export default class Exoneration extends Component {
    constructor(props) {
        super(props);

        this.state = {
            tax: null,
            error: null,
        };

        this.handleTaxEnterPressed = this.handleTaxEnterPressed.bind(this);
        this.handleTaxChange = this.handleTaxChange.bind(this);
        this.handleButtonClick = this.handleButtonClick.bind(this);
    }

    componentWillMount() {
        if (-1 === [1, 2, 3, 4].indexOf(parseInt(this.props.status))) {
            route('/not-found', true);
        }

        if (isNaN(parseInt(this.props.dependents))) {
            route('/not-found', true);
        }

        if (isNaN(parseInt(this.props.income))) {
            route('/not-found', true);
        }
    }

    handleTaxEnterPressed(event) {
        if (event.keyCode === 13) {
            this.handleButtonClick();
        }
    }

    handleTaxChange(event) {
        this.setState({
            tax: isNaN(parseInt(event.target.value)) ? null : parseInt(event.target.value),
        });
    }

    handleButtonClick() {
        if (isNaN(parseInt(this.state.tax))) {
            this.setState({
                error: 'Votre taxe d\'habitation est requise',
            });

            return;
        }

        let calculator = new Calculator();

        let nextYears = calculator.computeNextYears(
            parseInt(this.props.status),
            parseInt(this.props.dependents),
            parseInt(this.props.income),
            this.state.tax
        );

        route('/result/'+nextYears[2018]+'/'+nextYears[2019]+'/'+nextYears[2020]);
    }

    render() {
        return (
            <div className="exoneration">
                <div className="exoneration__icon">
                    <IconSunglasses />
                </div>

                <h1 className="exoneration__title">
                    Vous bénéficierez d'une baisse de votre taxe d’habitation dès l'année prochaine.
                </h1>

                {this.state.error ? <div className="form-error">{this.state.error}</div> : ''}

                <div className="exoneration__label">
                    <label for="previous-tax">
                        Quel était le montant de votre taxe d’habitation en 2017 ?
                    </label>
                </div>

                <div className="exoneration__field">
                    <input type="number"
                           id="previous-tax"
                           name="previous-tax"
                           placeholder="Entrer le montant (en €)"
                           value={this.state.tax}
                           onKeyUp={this.handleTaxEnterPressed}
                           onInput={this.handleTaxChange}
                    />
                </div>

                <div className="exoneration__submit">
                    <button type="button" className="page__button" onClick={this.handleButtonClick}>
                        Calculer ma taxe d’habitation pour les 3 prochaines années
                    </button>
                </div>
            </div>
        )
    }
};
