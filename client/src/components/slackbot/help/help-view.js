export const openHelpView = function () {
    return `<div class="modal fade" id="helpModal" tabindex="-1" role="dialog" aria-labelledby="helpModalrTitle" aria-hidden="true">
    <div class="modal-dialog modal-lg" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="helpModalTitle">I provide below services, please interact with me using any below sentence.</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body" id="helpModalBody">
          <div class="card">
            <ul class="list-group list-group-flush" id="helpElementsItem">
              
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>`;
  };
  
  export const openHelpViewList = function () {
    return `<li class="list-group-item p-2 bg-light">
    <strong>1. Interact with your github account. </strong><br />
    Ex: Please create a git repository with name <your-github-repository-name>.
    create issue <Issue-name> in repository <existing-github-repository-name>.
  </li>
  <li class="list-group-item p-2 bg-light">
    <strong>2. add a task to your todolist. </strong><br />
    Ex: add a task to todolist for completing testing by today.
  </li>
  <li class="list-group-item p-2 bg-light">
    <strong>3. Add reminder. </strong><br />
    Ex: remind me at 3:35 pm today to go home.
  </li>
  <li class="list-group-item p-2 bg-light">
    <strong>4. Add Calendar event. </strong><br />
    Ex: New appointment with Andrew Tuesday at noon.
  </li>
  <li class="list-group-item p-2 bg-light">
    <strong>5. Other Task. </strong><br />
    Ex: Add brajesh.anokha@sapient.com to codding team.
  </li>
  <li class="list-group-item p-2 bg-light">
    <strong>6. Open your todolist. </strong><br />
    Ex: show my todolist.
  </li>
  <li class="list-group-item p-2 bg-light">
    <strong>6. Open your reminder. </strong><br />
    Ex: show today reminder.
  </li>
  <li class="list-group-item p-2 bg-light">
    <strong>6. Open your calander. </strong><br />
    Ex: open my calendar.
  </li>`;
  };