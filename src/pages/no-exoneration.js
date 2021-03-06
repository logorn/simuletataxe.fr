import { h, Component } from 'preact';

import IconHandshake from '../components/icon-handshake';

export default class NoExoneration extends Component {
    render() {
        return (
            <div className="noexo">
                <div className="noexo__icon">
                    <IconHandshake />
                </div>

                <h1 className="noexo__title">
                    Vous ne bénéficiez pas de l'exonération<br/>en 2018.
                </h1>

                <h2 className="noexo__subtitle">
                    Mais vous contribuez à l'investissement dans votre commune, merci !
                </h2>

                <div>
                    <button type="button"
                            onClick={() => window.location.href = '/'}
                            className="page__button page__button--small startover--no-reduction">
                        Recommencer
                    </button>
                </div>
            </div>
        )
    }
};
