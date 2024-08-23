import React from "react";

const Navigation = () => {
  return (
    <div className="navbar bg-base-100 shadow">
      <div className="flex-1">
        <a className="btn btn-ghost text-xl">Vacation Manager</a>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal px-1">
          <li>
            <a>Link</a>
          </li>
          <li>
            <details>
              <summary>Parent</summary>
              <ul className="rounded-t-none bg-base-100 p-2">
                <li>
                  <a>Link 1</a>
                </li>
                <li>
                  <a>Link 2</a>
                </li>
              </ul>
            </details>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navigation;
