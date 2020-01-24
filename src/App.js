import React from "react";
import "./App.css";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      timeSheets: [],
      editMode: false
    };
  }

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  handleSubmit = event => {
    event.preventDefault();
    if (this.state.editMode) {
      this.editTimeSheet();
    } else {
      this.addNewTimeSheet(event);
    }
    event.target.reset();
    return;
  };

  addNewTimeSheet = event => {
    const { timeSheets, project, activity, from, to, note } = this.state;
    const timeSheet = {
      id: timeSheets.length,
      project: project,
      activity: activity,
      from: from,
      to: to,
      note: note
    };

    this.setState({
      editMode: false,
      project: "",
      activity: "",
      from: "",
      to: "",
      note: "",
      timeSheets: this.state.timeSheets.concat(timeSheet)
    });
  };
  deleteTimeSheet = id => {
    const proceed = window.confirm(
      "Är du säker på att du vill ta bort din tidrapport?"
    );
    if (proceed) {
      const timeSheets = this.state.timeSheets;
      let newTimeSheetsArray = timeSheets.filter(
        timeSheet => timeSheet.id !== id
      );

      this.setState({
        timeSheets: newTimeSheetsArray
      });
    }
    return proceed;
  };

  handleEditTimesheet = timeSheet => {
    this.setState({
      editMode: true,
      timesheetID: timeSheet.id,
      project: timeSheet.project,
      activity: timeSheet.activity,
      from: timeSheet.from,
      to: timeSheet.to,
      note: timeSheet.note
    });
  };

  editTimeSheet() {
    const { timesheetID, project, activity, from, to, note } = this.state;

    const editTimeSheet = {
      id: timesheetID,
      project: project,
      activity: activity,
      from: from,
      to: to,
      note: note
    };

    let timeSheets = this.state.timeSheets;
    const foundIndex = timeSheets.findIndex(t => t.id == timesheetID);
    timeSheets = [...timeSheets];
    timeSheets[foundIndex] = editTimeSheet;

    this.setState({
      editMode: false,
      project: "",
      activity: "",
      from: "",
      to: "",
      note: "",
      timeSheets: timeSheets
    });
  }

  render() {
    return (
      <div className="App">
        <h1>Tidrapportering</h1>
        <p>
          Mauris sit tincidunt, lectus cursus, integer adipiscing tempor, montes
          in rhoncus odio auctor urna sit arcu sagittis? A, scelerisque
          porttitor mauris urna montes vut, magnis dolor. Et aliquet?
        </p>
        <p>
          Et elementum, nunc parturient aliquam pulvinar elit vel ridiculus et
          cursus nec? Porta diam, ut. Augue, turpis mus, nunc sit ac, nascetur
          elementum habitasse risus etiam, in! Hac ut? Magnis, penatibus enim
          odio enim hac!
        </p>
        <form className="report" onSubmit={this.handleSubmit}>
          <div className="col-left">
            <label>
              Projekt
              <select name="project" onChange={this.handleChange}>
                <option value="">Var god välj ett projekt...</option>
                <option value="project1">Projekt 1</option>
                <option value="project2">Projekt 2</option>
                <option value="project3">Projekt 3</option>
              </select>
            </label>
            <label>
              Aktivitet
              <select name="activity" onChange={this.handleChange}>
                <option value="">Var god välj en aktivitet...</option>
                <option value="activity1">Aktivitet 1</option>
                <option value="activity2">Aktivitet 2</option>
                <option value="activity3">Aktivitet 3</option>
              </select>
            </label>
            <div className="pair">
              <label className="pair-left">
                Från
                <input
                  type="text"
                  name="from"
                  value={this.state.from}
                  onChange={this.handleChange}
                />
              </label>
              <label className="pair-right">
                Till
                <input
                  type="text"
                  name="to"
                  value={this.state.to}
                  onChange={this.handleChange}
                />
              </label>
            </div>
            <label className="checkbox">
              <span>Debiterbar</span>
              <input type="checkbox" name="billable" />
            </label>
          </div>
          <div className="col-right">
            <label>
              Anteckning
              <textarea
                name="note"
                cols="30"
                rows="10"
                value={this.state.note}
                onChange={this.handleChange}
              ></textarea>
            </label>
            <button type="submit">Spara</button>
          </div>
        </form>
        <table>
          <caption>Rapporterad tid</caption>
          <thead>
            <tr>
              <th>Projekt</th>
              <th>Aktivitet</th>
              <th>Från</th>
              <th>Till</th>
              <th>Anteckning</th>
              <th colspan="2">Åtgärd</th>
            </tr>
          </thead>
          <tfoot>
            <tr>
              <td colspan="7">Summa total tid: 8:00</td>
            </tr>
          </tfoot>
          <tbody>
            {this.state.timeSheets.map(timeSheet => {
              return [
                <tr>
                  <td>{timeSheet.project}</td>
                  <td>{timeSheet.activity}</td>
                  <td>{timeSheet.from}</td>
                  <td>{timeSheet.to}</td>
                  <td>{timeSheet.note}</td>
                  <td>
                    <button
                      onClick={event => this.handleEditTimesheet(timeSheet)}
                    >
                      Redigera
                    </button>
                  </td>
                  <td>
                    <button onClick={() => this.deleteTimeSheet(timeSheet.id)}>
                      Radera
                    </button>
                  </td>
                </tr>
              ];
            })}
          </tbody>
        </table>
      </div>
    );
  }
}

export default App;
