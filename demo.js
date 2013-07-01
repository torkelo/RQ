function widget(name) {
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

function show(success, failure) {
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
        widget('Seq A1'),
        widget('Seq A2'),
        widget('Seq A3')
    ]),
    RQ.sequence([
        widget('Seq B1'),
        widget('Seq B2'),
        widget('Seq B3')
    ]),
    widget('C'),
    RQ.race([
        widget('Race D1'),
        widget('Race D2'),
        widget('Race D3'),
    ]),
    RQ.fallback([
        widget('Fall E1'),
        widget('Fall E2'),
        widget('Fall E3')
    ])
], [
    RQ.sequence([
        widget('Opt Seq O1'),
        widget('Opt Seq O2'),
        widget('Opt Seq O3')
    ]),
    RQ.sequence([
        widget('Opt Seq P1'),
        widget('Opt Seq P2'),
        widget('Opt Seq P3')
    ]),
    widget('Opt Q'),
    RQ.race([
        widget('Opt Race R1'),
        widget('Opt Race R2'),
        widget('Opt Race R3'),
    ]),
    RQ.fallback([
        widget('Opt Fall S1'),
        widget('Opt Fall S2'),
        widget('Opt Fall S3')
    ])
])(show);
