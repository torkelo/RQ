// demo.js

// This is used by demo.html to demonstrate rq.js. It include a WIDGET function
// that represents a service requestory, a SHOW function that is a requestion
// that displays the final result, and an RQ program written as an annotated
// nested array.


function WIDGET(name) {
    return function requestor(requestion, value) {
        var result = value ? value + '>' + name : name,
            fieldset = demo.tag('fieldset'),
            legend = demo.tag('legend')
                .value(name),
            success = demo.tag('input', 'button', 'success')
                .value('success')
                .on('click', function () {
                    fieldset.style('backgroundColor', 'lightgreen');
                    return requestion(result);
                }),
            failure = demo.tag('input', 'button', 'failure')
                .value('failure')
                .on('click', function () {
                    fieldset.style('backgroundColor', 'pink');
                    return requestion(undefined, result);
                });
        fieldset.append(legend);
        fieldset.append(success);
        fieldset.append(failure);
        demo.append(fieldset);
        return function quash() {
            fieldset.style('backgroundColor', 'silver');
        };
    };
}

function SHOW(success, failure) {
    var result, title, color;
    if (failure === undefined) {
        result = success;
        title = "success";
        color = 'lightgreen';
    } else {
        result = failure;
        title = "failure";
        color = 'pink';
    }
    demo.append(
        demo.tag('fieldset')
            .style('backgroundColor', color)
            .append(demo.tag('legend')
                .value(title)
                .style('backgroundColor', color))
            .append(JSON.stringify(result))
    );
}

RQ.parallel([
    RQ.sequence([
        WIDGET('Seq A1'),
        WIDGET('Seq A2'),
        WIDGET('Seq A3')
    ]),
    RQ.sequence([
        WIDGET('Seq B1'),
        WIDGET('Seq B2'),
        WIDGET('Seq B3')
    ]),
    WIDGET('C'),
    RQ.race([
        WIDGET('Race D1'),
        WIDGET('Race D2'),
        WIDGET('Race D3'),
    ]),
    RQ.fallback([
        WIDGET('Fall E1'),
        WIDGET('Fall E2'),
        WIDGET('Fall E3')
    ])
], [
    RQ.sequence([
        WIDGET('Opt Seq O1'),
        WIDGET('Opt Seq O2'),
        WIDGET('Opt Seq O3')
    ]),
    RQ.sequence([
        WIDGET('Opt Seq P1'),
        WIDGET('Opt Seq P2'),
        WIDGET('Opt Seq P3')
    ]),
    WIDGET('Opt Q'),
    RQ.race([
        WIDGET('Opt Race R1'),
        WIDGET('Opt Race R2'),
        WIDGET('Opt Race R3'),
    ]),
    RQ.fallback([
        WIDGET('Opt Fall S1'),
        WIDGET('Opt Fall S2'),
        WIDGET('Opt Fall S3')
    ])
])(SHOW);
