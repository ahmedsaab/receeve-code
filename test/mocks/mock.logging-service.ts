import { ILoggingService } from "../../src/services/interfaces/logging-service";
import * as Sinon from 'sinon';

export default class MockLoggingService implements ILoggingService {
  info = Sinon.stub();
  error = Sinon.stub();
}
